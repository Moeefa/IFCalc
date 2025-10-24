import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_CONFIG, COOKIES, API_ENDPOINTS } from "./constants";
import { getSuapBaseUrl, handleApiError } from "./helpers";
import https from "https";

export interface LoginCredentials {
	username: string;
	password: string;
	provider: string;
}

export interface TokenPair {
	access: string;
	refresh: string;
}

export interface AuthResult {
	success: boolean;
	error?: string;
}

export class AuthService {
	private static setCookies(tokenPair: TokenPair): void {
		const cookieStore = cookies();
		const cookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: "lax" as const,
			path: "/",
		};

		cookieStore.set(COOKIES.ACCESS_TOKEN, tokenPair.access, {
			...cookieOptions,
			maxAge: AUTH_CONFIG.ACCESS_TOKEN_EXPIRES,
		});
		cookieStore.set(COOKIES.REFRESH_TOKEN, tokenPair.refresh, {
			...cookieOptions,
			maxAge: AUTH_CONFIG.REFRESH_TOKEN_EXPIRES,
		});
	}

	private static clearCookies(): void {
		const cookieStore = cookies();
		cookieStore.delete(COOKIES.ACCESS_TOKEN);
		cookieStore.delete(COOKIES.REFRESH_TOKEN);
		cookieStore.delete(COOKIES.PERIOD);
	}

	static getTokens(): {
		accessToken: string | null;
		refreshToken: string | null;
	} {
		const cookieStore = cookies();
		return {
			accessToken: cookieStore.get(COOKIES.ACCESS_TOKEN)?.value ?? null,
			refreshToken: cookieStore.get(COOKIES.REFRESH_TOKEN)?.value ?? null,
		};
	}

	static isAuthenticated(): boolean {
		const { accessToken } = this.getTokens();
		return !!accessToken;
	}

	static async login(credentials: LoginCredentials): Promise<AuthResult> {
		try {
			const baseUrl = getSuapBaseUrl(credentials.provider);
			const response = await fetch(`${baseUrl}${API_ENDPOINTS.TOKEN_PAIR}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					username: credentials.username,
					password: credentials.password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				return {
					success: false,
					error: errorData.detail || "Login failed",
				};
			}

			const tokenPair = await response.json();
			this.setCookies(tokenPair);

			return { success: true };
		} catch (error) {
			handleApiError(error, "AuthService.login");
			return {
				success: false,
				error: "Internal server error",
			};
		}
	}

	static async refreshToken(): Promise<AuthResult> {
		try {
			const { refreshToken } = this.getTokens();

			if (!refreshToken) {
				return {
					success: false,
					error: "Missing refresh token",
				};
			}

			const baseUrl = getSuapBaseUrl("ifmt");
			const response = await fetch(`${baseUrl}${API_ENDPOINTS.TOKEN_REFRESH}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (!response.ok) {
				const error = await response.json();
				return {
					success: false,
					error: error.detail || "Token refresh failed",
				};
			}

			const tokenPair = await response.json();
			this.setCookies(tokenPair);

			return { success: true };
		} catch (error) {
			handleApiError(error, "AuthService.refreshToken");
			return {
				success: false,
				error: "Internal server error",
			};
		}
	}

	static logout(): void {
		this.clearCookies();
	}

	static createAuthenticatedRedirect(
		url: string,
		request: Request,
	): NextResponse {
		return NextResponse.redirect(new URL(url, request.url));
	}

	static createUnauthenticatedResponse(
		error: string,
		status = 401,
	): NextResponse {
		return NextResponse.json({ error }, { status });
	}
}
