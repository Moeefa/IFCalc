import { TableCell } from "@/components/ui/table";

interface TimeSlotCellProps {
	label: string;
	time: string;
}

export function TimeSlotCell({ label, time }: TimeSlotCellProps) {
	return (
		<TableCell className="h-16 p-0 border-r">
			<div className="h-full flex flex-col justify-center items-center">
				<span className="text-xs text-muted-foreground">{label}</span>
				<span className="text-xs text-muted-foreground">{time}</span>
			</div>
		</TableCell>
	);
}

