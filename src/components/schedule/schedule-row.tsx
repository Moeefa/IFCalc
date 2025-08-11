import { TableRow } from "@/components/ui/table";
import { TimeSlotCell } from "./time-slot-cell";
import { ScheduleCell } from "./schedule-cell";
import { normalizeTime } from "@/lib/schedule-utils";
import { WEEKDAYS } from "@/lib/constants";
import { Diary } from "../../../types/suap";

interface ScheduleRowProps {
	label: string;
	time: string;
	scheduleMap: { [time: string]: { [day: string]: Diary } };
}

export function ScheduleRow({ label, time, scheduleMap }: ScheduleRowProps) {
	const normalizedSlotTime = normalizeTime(time);

	return (
		<TableRow>
			<TimeSlotCell label={label} time={time} />
			{WEEKDAYS.map((day) => {
				const diary = scheduleMap[normalizedSlotTime]?.[day];
				return <ScheduleCell key={day} diary={diary} day={day} />;
			})}
		</TableRow>
	);
}

