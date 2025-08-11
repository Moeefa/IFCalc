"use client";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "react-day-picker/locale";
import { format } from "date-fns";
import { ptBR as ptLocale } from "date-fns/locale";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	useMemo,
	useState,
	useContext,
	createContext,
	Dispatch,
	SetStateAction,
} from "react";
import { Homework } from "../../../../types/suap";
import { UI_CONFIG } from "@/lib/constants";

function parseDate(dateStr: string) {
	const [day, month, year] = dateStr.split("/").map(Number);
	return new Date(year, month - 1, day);
}

function getDateRange(start: Date, end: Date): Date[] {
	const dates = [];
	let current = new Date(start);
	while (current <= end) {
		dates.push(new Date(current));
		current.setDate(current.getDate() + 1);
	}
	return dates;
}

export default function CalendarComponent({
	homeworks,
}: {
	homeworks: Homework[];
}) {
	const [selected, setSelected] = useState<Date>(new Date());
	const [month, setMonth] = useState(new Date());

	const homeworkRanges = useMemo(() => {
		return homeworks.map((hw) => {
			const start = parseDate(hw.data_solicitacao);
			const end = parseDate(hw.data_limite);
			return {
				...hw,
				start,
				end,
				dates: getDateRange(start, end),
			};
		});
	}, [homeworks]);

	const homeworksOnSelectedDay = useMemo(() => {
		if (!selected) return [];
		return homeworkRanges.filter((hw) =>
			hw.dates.some(
				(d) =>
					d.getDate() === selected.getDate() &&
					d.getMonth() === selected.getMonth() &&
					d.getFullYear() === selected.getFullYear(),
			),
		);
	}, [selected, homeworkRanges]);

	const homeworksByDate = useMemo(() => {
		const map: Record<string, typeof homeworkRanges> = {};
		homeworkRanges.forEach((hw) => {
			hw.dates.forEach((date) => {
				const key = date.toISOString().slice(0, 10);
				if (!map[key]) map[key] = [];
				map[key].push(hw);
			});
		});
		return map;
	}, [homeworkRanges]);

	const colors = UI_CONFIG.CALENDAR_COLORS;

	const SelectedDateContext = createContext<{
		selected?: Date;
		setSelected?: Dispatch<SetStateAction<Date>>;
		month?: Date;
		setMonth?: Dispatch<SetStateAction<Date>>;
	}>({});

	return (
		<SelectedDateContext.Provider value={{ selected, setSelected }}>
			<Card className="sm:w-fit w-full py-4 bg-card-gradient shadow-none border border-border rounded-2xl">
				<CardContent className="px-4 flex justify-center">
					<Calendar
						required
						mode="single"
						locale={ptBR}
						selected={selected}
						onSelect={setSelected}
						month={month}
						onMonthChange={setMonth}
						className="bg-transparent p-0 select-none"
						components={{
							Day: ({ day, modifiers, className, ...props }) => {
								return (
									<td
										className={`relative min-h-10 ${className} !rounded-md`}
										{...props}
									>
										{props.children}
									</td>
								);
							},
							DayButton: (props) => {
								const { day, modifiers, ...buttonProps } = props;
								const { setSelected } = useContext(SelectedDateContext);

								const key = day.date.toISOString().slice(0, 10);
								const homeworksForDay = homeworksByDate[key] || [];

								return (
									<button
										{...buttonProps}
										onClick={() => setSelected?.(day.date)}
										className="relative flex flex-col items-center justify-center w-10 h-10 rounded-2xl transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
									>
										<div className="font-semibold flex-1">
											{day.date.getDate()}
										</div>
										{homeworksForDay.length > 0 && (
											<div className="flex justify-center gap-1 mt-1 absolute bottom-1 left-0 right-0">
												{homeworksForDay.length < 4 ? (
													homeworksForDay.slice(0, 4).map((hw, index) => (
														<span
															key={hw.id + index}
															className="w-2 h-2 rounded-full"
															style={{
																backgroundColor: colors[index % colors.length],
															}}
															title={`Tarefa #${hw.id}`}
														/>
													))
												) : (
													<span className="text-xs font-semibold text-foreground">
														+{homeworksForDay.length}
													</span>
												)}
											</div>
										)}
									</button>
								);
							},
						}}
					/>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
					<div className="text-sm font-medium pl-1">
						{format(selected, "dd 'de' MMMM 'de' yyyy", {
							locale: ptLocale,
						})}
					</div>
					{homeworksOnSelectedDay.length > 0 ? (
						<div className="flex w-full flex-col gap-2">
							{homeworksOnSelectedDay.map((event) => (
								<div
									key={event.id}
									className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
								>
									<div className="font-medium">{event.titulo}</div>
									<div className="text-muted-foreground text-xs">
										{event.data_solicitacao} até {event.data_limite}
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-muted-foreground pl-1">
							Nenhum trabalho neste dia
						</p>
					)}
				</CardFooter>
			</Card>
		</SelectedDateContext.Provider>
	);
}
