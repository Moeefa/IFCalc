"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Period } from "../../types/suap";
import { revalidate } from "@/app/actions/revalidate";
import { COOKIES } from "@/lib/constants";
import { PenIcon } from "@/components/icons/pen";

export function PeriodSelector({
	periods,
	initialValue,
}: {
	periods: Period[] | undefined;
	initialValue?: string;
}) {
	const [selected, setSelected] = useState(() => {
		return initialValue || periods?.[0].id.toString() || "";
	});

	useEffect(() => {
		if (!selected) return;
		document.cookie = `${COOKIES.PERIOD}=${selected}; path=/; max-age=2592000`;
		revalidate();
	}, [selected]);

	return (
		<div className="p-2 bg-background rounded-lg border border-border flex flex-col gap-1">
			<p className="font-semibold px-3 flex items-center text-lg">
				Período letivo <PenIcon className="size-6 ml-1" />
			</p>
			<Select value={selected} onValueChange={setSelected}>
				<SelectTrigger className="text-xl shadow-none font-semibold m-0 border-none w-full flex justify-between">
					<SelectValue placeholder="Selecione" />
				</SelectTrigger>
				<SelectContent>
					{periods?.map((period) => (
						<SelectItem
							key={period.id}
							value={period.id.toString()}
							className="font-semibold"
						>
							{period.semestre}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
