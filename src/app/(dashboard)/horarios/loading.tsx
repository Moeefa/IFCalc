import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TIME_SLOTS, WEEKDAYS } from "@/lib/constants";
import { IntervalRow, ScheduleCell, TimeSlotCell } from "@/components/schedule";

export default async function Loading() {
	return (
		<div className="bg-card-gradient rounded-2xl border border-border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="min-w-32 border-r" />
						<TableHead className="text-center w-1/6 border-r">Seg.</TableHead>
						<TableHead className="text-center w-1/6 border-r">Ter.</TableHead>
						<TableHead className="text-center w-1/6 border-r">Qua.</TableHead>
						<TableHead className="text-center w-1/6 border-r">Qui.</TableHead>
						<TableHead className="text-center w-1/6 border-r">Sex.</TableHead>
						<TableHead className="text-center w-1/6 border-r">Sáb.</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{TIME_SLOTS.map((slot, index) =>
						slot.label === "Intervalo" ? (
							<IntervalRow key={index} label={slot.label} time={slot.time} />
						) : (
							<TableRow key={index}>
								<TimeSlotCell label={slot.label} time={slot.time} />
								{WEEKDAYS.map((day) => {
									return <ScheduleCell key={day} day={day} />;
								})}
							</TableRow>
						),
					)}
				</TableBody>
			</Table>
		</div>
	);
}
