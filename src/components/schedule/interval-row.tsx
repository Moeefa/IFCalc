import { TableCell, TableRow } from "@/components/ui/table";
import { TimeSlotCell } from "./time-slot-cell";

interface IntervalRowProps {
	label: string;
	time: string;
}

export function IntervalRow({ label, time }: IntervalRowProps) {
	return (
		<TableRow>
			<TimeSlotCell label={label} time={time} />
			<TableCell className="px-2 p-0 border-r" colSpan={6}>
				<div className="w-full h-12" />
			</TableCell>
		</TableRow>
	);
}

