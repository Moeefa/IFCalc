import {
	Atom,
	Calculator,
	Code,
	FlaskConical,
	Globe,
	NotebookText,
	Palette,
	Scale,
	Server,
	BookOpenCheck,
	GraduationCap,
} from "lucide-react";
import { SUBJECT_ICON_RULES, GRADE_COLORS } from "@/lib/constants";

const iconComponents = {
	Calculator: <Calculator className="size-6 text-muted-foreground" />,
	Atom: <Atom className="size-6 text-muted-foreground" />,
	Code: <Code className="size-6 text-muted-foreground" />,
	FlaskConical: <FlaskConical className="size-6 text-muted-foreground" />,
	Globe: <Globe className="size-6 text-muted-foreground" />,
	BookOpenCheck: <BookOpenCheck className="size-6 text-muted-foreground" />,
	Scale: <Scale className="size-6 text-muted-foreground" />,
	Server: <Server className="size-6 text-muted-foreground" />,
	Palette: <Palette className="size-6 text-muted-foreground" />,
	GraduationCap: <GraduationCap className="size-6 text-muted-foreground" />,
} as const;

export function getSubjectIcon(subjectName: string) {
	const lower = subjectName.toLowerCase();

	for (const rule of SUBJECT_ICON_RULES) {
		if (rule.keywords.some((keyword) => lower.includes(keyword))) {
			return iconComponents[rule.iconName];
		}
	}

	return <NotebookText className="size-6 text-muted-foreground" />;
}

export function getGradeColor(grade: number) {
	if (grade >= 9) return GRADE_COLORS.EXCELLENT;
	if (grade >= 7) return GRADE_COLORS.GOOD;
	return GRADE_COLORS.POOR;
}
