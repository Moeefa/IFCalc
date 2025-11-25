import { cookies } from "next/headers";
import type {
  Period,
  Subject,
  SubjectDetails,
  Diary,
  Homework,
  Message,
  User,
  Material,
  Results,
} from "../../types/suap";
import { cache } from "react";
import { AUTH_CONFIG, COOKIES, API_ENDPOINTS, SuapProvider } from "./constants";
import { getSuapBaseUrl, createTimeoutSignal, handleApiError } from "./helpers";
import { AuthService } from "./auth-service";

function createSuapFetchOptions(token: string): RequestInit {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: {
      tags: ["suap_fetch"],
      revalidate: AUTH_CONFIG.CACHE_REVALIDATE,
    },
    signal: createTimeoutSignal(AUTH_CONFIG.REQUEST_TIMEOUT),
  };
}

export async function getSuapToken(): Promise<string | null> {
  return AuthService.getTokens().accessToken;
}

export async function getSuapProvider(): Promise<SuapProvider> {
  return (cookies().get(COOKIES.PROVIDER)?.value as SuapProvider) ?? "ifmt";
}

async function fetchFromSuap<T>(path: string): Promise<T | null> {
  try {
    const token = await getSuapToken();
    const provider = await getSuapProvider();

    if (!token) {
      console.warn(`No access token available for ${path}`);
      return null;
    }

    const baseUrl = getSuapBaseUrl(provider);
    const response = await fetch(
      `${baseUrl}${path}`,
      createSuapFetchOptions(token),
    );

    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      if (response.status === 401) {
        console.warn("Authentication expired, user needs to login again");
      } else if (response.status === 403) {
        console.warn("Access forbidden for resource:", path);
      } else if (response.status >= 500) {
        console.error("Server error occurred:", errorMessage);
      }

      handleApiError(errorMessage, `fetchFromSuap(${path})`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("Network error - check internet connection");
    }
    handleApiError(error, `fetchFromSuap(${path})`);
    return null;
  }
}

export async function createSuapClient() {
  const token = await getSuapToken();
  const provider = await getSuapProvider();
  const baseUrl = getSuapBaseUrl(provider);

  if (!token) {
    throw new Error("Token de acesso ausente");
  }

  return {
    get: async <T>(path: string): Promise<T | null> => {
      return fetchFromSuap<T>(path);
    },
    post: async <T>(path: string, body: unknown): Promise<T | null> => {
      try {
        const response = await fetch(`${baseUrl}${path}`, {
          ...createSuapFetchOptions(token),
          method: "POST",
          headers: {
            ...createSuapFetchOptions(token).headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          handleApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            `POST ${path}`,
          );
          return null;
        }

        return await response.json();
      } catch (error) {
        handleApiError(error, `POST ${path}`);
        return null;
      }
    },
  };
}

export async function getPeriod(): Promise<Period | undefined> {
  const periodID = cookies().get(COOKIES.PERIOD)?.value;
  const periods = await getPeriods();

  if (!periodID || !periods?.results.length) {
    return periods?.results[0];
  }

  return (
    periods.results.find((p) => p.id === Number(periodID)) ||
    periods?.results[0]
  );
}

export async function getUserData(): Promise<User | null> {
  return await fetchFromSuap<User>(API_ENDPOINTS.USER_DATA);
}

export const getPeriods = cache(async (): Promise<Results<Period> | null> => {
  return await fetchFromSuap<Results<Period>>(API_ENDPOINTS.PERIODS);
});

export async function getSubjects(): Promise<Subject[]> {
  const period = await getPeriod();

  if (!period?.semestre) {
    return [];
  }

  const subjects = await fetchFromSuap<Results<Subject>>(
    API_ENDPOINTS.SUBJECTS(period.semestre),
  );

  return subjects?.results ?? [];
}

export async function getSubjectDetails(
  subjectId: number,
): Promise<SubjectDetails[] | null> {
  return (
    (
      await fetchFromSuap<Results<SubjectDetails>>(
        API_ENDPOINTS.SUBJECT_DETAILS(subjectId),
      )
    )?.results ?? null
  );
}

export async function getDiaries(): Promise<Diary[]> {
  const period = await getPeriod();

  if (!period?.semestre) {
    return [];
  }

  const diaries = await fetchFromSuap<Results<Diary>>(
    API_ENDPOINTS.DIARIES(period.semestre),
  );

  return diaries?.results ?? [];
}

export async function getHomeworks(): Promise<Homework[]> {
  const diaries = await getDiaries();

  if (!diaries.length) {
    return [];
  }

  const homeworkPromises = diaries.map(async (diary) => {
    const homeworks = await fetchFromSuap<Results<Homework>>(
      API_ENDPOINTS.HOMEWORKS(diary.id),
    );

    if (!homeworks?.results) {
      return [];
    }

    return homeworks.results.map((hw) => ({
      ...hw,
      diario: diary,
    }));
  });

  const allHomeworks = await Promise.all(homeworkPromises);
  return allHomeworks.flat();
}

export async function getMessages(): Promise<Message[]> {
  const messages = await fetchFromSuap<Results<Message>>(
    API_ENDPOINTS.MESSAGES,
  );

  return messages?.results ?? [];
}

export async function getMaterial(diaryId: number): Promise<Material[]> {
  const materials = await fetchFromSuap<Results<Material>>(
    API_ENDPOINTS.MATERIALS(diaryId),
  );

  return materials?.results ?? [];
}

export async function getMaterials(): Promise<Material[]> {
  const diaries = await getDiaries();

  if (!diaries.length) {
    return [];
  }

  const materialPromises = diaries.map(async (diary) => {
    const materials = await fetchFromSuap<Results<Material>>(
      API_ENDPOINTS.MATERIALS(diary.id),
    );
    console.log("Materials for diary", diary.id, materials);

    if (!materials?.results) {
      return [];
    }

    return materials.results.map((hw) => ({
      ...hw,
      diario: diary,
    }));
  });

  const allHomeworks = await Promise.all(materialPromises);
  return allHomeworks.flat();
}
