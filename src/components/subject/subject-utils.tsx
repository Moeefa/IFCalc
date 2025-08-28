import { SUBJECT_ICON_RULES, GRADE_COLORS } from "@/lib/constants";
import { BookBookmarkIcon } from "../icons/book-bookmark";
import { Rotation360Icon } from "../icons/rotation-360";
import { CalculatorIcon } from "../icons/calculator";
import { BastketballIcon } from "../icons/basketball";
import { ScaleIcon } from "../icons/scale";
import { EarthIcon } from "../icons/earth";
import { GraduationCapIcon } from "../icons/graduation-cap";
import { BookOpenIcon } from "../icons/book-open";
import { ComputerIcon } from "../icons/computer";
import { LayersIcon } from "../icons/layers";
import { PaintbrushIcon } from "../icons/paintbrush";

const iconComponents = {
	Calculator: <CalculatorIcon className="size-6" />,
	Rotation360: <Rotation360Icon className="size-6" />,
	Computer: <ComputerIcon className="size-6" />,
	Earth: <EarthIcon className="size-6" />,
	BookOpen: <BookOpenIcon className="size-6" />,
	Scale: <ScaleIcon className="size-6" />,
	Layers: <LayersIcon className="size-6" />,
	Paintbrush: <PaintbrushIcon className="size-6" />,
	GraduationCap: <GraduationCapIcon className="size-6" />,
	Basketball: <BastketballIcon className="size-6" />,
} as const;

export function getSubjectIcon(subjectName: string) {
	const lower = subjectName.toLowerCase();

	for (const rule of SUBJECT_ICON_RULES) {
		if (rule.keywords.some((keyword) => lower.includes(keyword))) {
			return iconComponents[rule.iconName];
		}
	}

	return <BookBookmarkIcon className="size-6" />;
}

export function getGradeColor(grade: number) {
	if (grade >= 9) return GRADE_COLORS.EXCELLENT;
	if (grade >= 7) return GRADE_COLORS.GOOD;
	return GRADE_COLORS.POOR;
}
