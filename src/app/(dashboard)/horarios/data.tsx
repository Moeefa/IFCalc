import { IntervalRow, ScheduleRow } from "@/components/schedule";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TIME_SLOTS } from "@/lib/constants";
import { createScheduleMap } from "@/lib/schedule-utils";
import { getDiaries } from "@/lib/suap";

export default async function ScheduleData() {
  const diaries = await getDiaries();
  const scheduleMap = createScheduleMap(diaries);

  console.log("Schedule Map:", scheduleMap);

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
              <ScheduleRow
                key={index}
                label={slot.label}
                time={slot.time}
                scheduleMap={scheduleMap}
              />
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
