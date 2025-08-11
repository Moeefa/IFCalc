import { TableCell } from "@/components/ui/table";
import { Diary } from "../../../types/suap";

interface ScheduleCellProps {
	diary?: Diary;
	day: string;
}

export function ScheduleCell({ diary, day }: ScheduleCellProps) {
	return (
		<TableCell key={day} className="px-2 border-r">
			{diary ? (
				<div className="flex flex-col gap-1">
					<span className="font-semibold text-sm">
						{diary.disciplina.nome}
					</span>
					<span className="text-xs text-muted-foreground">
						{diary.professor?.at(0)?.nome}
					</span>
					<span className="text-xs text-muted-foreground">
						{diary.local?.sala}
					</span>
				</div>
			) : (
				<span className="text-xs text-muted-foreground"></span>
			)}
		</TableCell>
	);
}

