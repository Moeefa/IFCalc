import { GRADE_COLORS, GRADE_CONFIG } from "./constants";

export function getGradeColor(grade: number): string {
	if (grade >= 9) return GRADE_COLORS.EXCELLENT;
	if (grade >= 7) return GRADE_COLORS.GOOD;
	return GRADE_COLORS.POOR;
}

export function isPassingGrade(grade: number): boolean {
	return grade >= GRADE_CONFIG.PASSING_GRADE;
}

export function parseGrade(gradeString: string): number {
	const cleanGrade = gradeString?.replace(",", ".") || "0";
	return Number(cleanGrade);
}

export function formatGrade(grade: number): string {
	return grade.toFixed(2);
}

export function getSuapBaseUrl(provider: string): string {
	return `https://suap.${provider}.edu.br`;
}

export function parseDate(dateStr: string): Date {
	const [day, month, year] = dateStr.split("/").map(Number);
	return new Date(year, month - 1, day);
}

export function getDateRange(start: Date, end: Date): Date[] {
	const dates = [];
	let current = new Date(start);
	while (current <= end) {
		dates.push(new Date(current));
		current.setDate(current.getDate() + 1);
	}
	return dates;
}

export function createTimeoutSignal(timeoutMs: number): AbortSignal {
	return AbortSignal.timeout(timeoutMs);
}

export function handleApiError(error: unknown, context: string): void {
	console.error(`Error in ${context}:`, error);
}
