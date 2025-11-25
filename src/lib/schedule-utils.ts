import { TIME_MAPPING } from "./constants";
import { Diary } from "../../types/suap";

/**
 * Normalizes a time string by removing spaces and converting to lowercase
 */
export function normalizeTime(timeStr: string): string {
  return timeStr.replace(/\s/g, "").toLowerCase();
}

/**
 * Extracts time range from a schedule string (e.g., "Segunda: 7:00 - 7:50")
 * Maps known time variations to standard format
 */
export function extractTimeFromHorario(horarioStr: string): string {
  const timeMatch = horarioStr.match(/(\d{2}:\d{2}\s*-\s*\d{2}:\d{2})/);
  if (!timeMatch) return "";

  let actualTime = timeMatch[1];

  // Map known time variations to standard format
  if (actualTime in TIME_MAPPING) {
    actualTime = TIME_MAPPING[actualTime as keyof typeof TIME_MAPPING];
  }

  return normalizeTime(actualTime);
}

/**
 * Extracts day name from a schedule string (e.g., "Segunda: 7:00 - 7:50")
 */
export function extractDayFromHorario(horarioStr: string): string {
  const dayMatch = horarioStr.match(/^([^:]+):/);
  return dayMatch ? dayMatch[1].trim() : "";
}

/**
 * Creates a schedule map from diary data
 * Returns a nested object where first key is normalized time and second key is day name
 */
export function createScheduleMap(diaries: Diary[]): {
  [time: string]: { [day: string]: Diary };
} {
  const scheduleMap: { [time: string]: { [day: string]: Diary } } = {};

  console.log("Creating schedule map from diaries:", diaries);
  diaries.forEach((diary) => {
    diary.horarios?.forEach((h) => {
      console.log("Processing horario:", h);
      const horario = extractTimeFromHorario(h.horario);

      if (horario && h.dia) {
        if (!scheduleMap[horario]) scheduleMap[horario] = {};
        scheduleMap[horario][h.dia] = diary;
      }
    });
  });

  return scheduleMap;
}
