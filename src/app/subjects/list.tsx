"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { SettingsContext } from "@/contexts/settings";
import type { Subject } from "../../../types/responses";
import { useContext } from "react";

export default function List({ data }: { data: Subject[] }) {
	const { averageType } = useContext(SettingsContext);

	return (
		<Accordion type="single" collapsible>
			{data.map((subject, i) => (
				<AccordionItem
					className="last:border-none"
					key={subject.id}
					value={subject.id}
				>
					<AccordionTrigger className="flex justify-start px-4 gap-2 w-full hover:no-underline group">
						<span className="size-10 border-[1px] dark:border-[2px] border-neutral-900 dark:border-neutral-200 bg-gradient-to-b from-black/70 to-black dark:from-white dark:to-white/80 p-[1px] transition duration-300 ease-in-out rounded-full">
							<div className="w-full h-full flex items-center justify-center gap-2 bg-gradient-to-b from-neutral-800 to-black dark:from-neutral-200 dark:to-neutral-50 text-sm text-white/90 dark:text-black/80 transition duration-300 ease-in-out hover:from-stone-800 hover:to-neutral-800/70 dark:hover:from-stone-200 dark:hover:to-neutral-200 dark:active:from-stone-300 dark:active:to-neutral-300 active:bg-gradient-to-b active:from-black active:to-black rounded-full p-1">
								{Number(
									averageType === "weighted"
										? subject.weightedAverage
										: subject.average,
								).toLocaleString("pt-BR")}
							</div>
						</span>
						<div className="flex flex-col w-1/2 flex-1">
							<p className="truncate text-left text-base flex-1 group-[state=open]:text-wrap">
								{subject.name}
							</p>
							<p className="truncate text-left text-xs">
								{Number(
									averageType === "weighted"
										? subject.weightedAverage
										: subject.average,
								) < 6
									? "Reprovado"
									: "Aprovado"}
							</p>
						</div>
					</AccordionTrigger>
					<AccordionContent className="w-full px-4">
						<Table className="w-full">
							<TableHeader className="[&_tr]:border-none [&_tr]:dark:bg-neutral-800 [&_tr]:bg-stone-100 [&_tr>th]:text-muted-foreground [&_tr]:rounded-xl [&_tr>th:first-child]:rounded-l-xl [&_tr>th:last-child]:rounded-r-xl [&_tr>th]:h-9">
								<TableRow>
									{[...Array(4)].map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<TableHead key={i} className="text-center text-xs">
											{i + 1}º
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody className="[&_tr>td:first-child]:rounded-l-xl [&_tr>td:last-child]:rounded-r-xl [&_tr>td]:h-9">
								<TableRow className="hover:bg-transparent">
									{[...Array(4)].map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<TableCell key={i} className="font-medium text-center">
											{Number(subject.grades[i]).toLocaleString("pt-BR")}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
