import { Diary } from "./suap";

export interface TimeSlot {
	label: string;
	time: string;
}

export interface ScheduleMap {
	[time: string]: {
		[day: string]: Diary;
	};
}

export type WeekDay = "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado";

export interface ScheduleCellData {
	diary?: Diary;
	day: WeekDay;
}

export interface TimeSlotCellData {
	label: string;
	time: string;
}

export interface ScheduleRowData extends TimeSlotCellData {
	scheduleMap: ScheduleMap;
}

