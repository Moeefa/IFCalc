"use client";

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "react-day-picker/locale";
import { ptBR as ptLocale } from "date-fns/locale";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";

export default function Loading() {
	const table = useReactTable({
		data: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<Card className="sm:w-fit w-full py-4 bg-card-gradient shadow-none border border-border rounded-2xl">
				<CardContent className="px-4 flex justify-center">
					<Calendar
						mode="single"
						locale={ptBR}
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

								return (
									<button
										{...buttonProps}
										className="relative flex flex-col items-center justify-center w-10 h-10 rounded-2xl transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
									>
										<div className="font-semibold">{day.date.getDate()}</div>
									</button>
								);
							},
						}}
					/>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
					<div className="text-sm font-medium pl-1">
						{format(new Date(), "dd 'de' MMMM 'de' yyyy", {
							locale: ptLocale,
						})}
					</div>
					<p className="text-sm text-muted-foreground pl-1">
						Nenhum trabalho neste dia
					</p>
				</CardFooter>
			</Card>
			<div className="overflow-hidden rounded-2xl border bg-card-gradient font-semibold w-full h-full">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="px-4">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{[...Array(10)].map((_, index) => (
							<TableRow key={index}>
								<TableCell className="px-2" colSpan={columns.length}>
									<Skeleton className="w-full h-5" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
