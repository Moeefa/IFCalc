"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Homework } from "../../../../types/suap";

export const columns: ColumnDef<Homework>[] = [
	{
		accessorKey: "titulo",
		header: "Título",
	},
	{
		accessorKey: "data_solicitacao",
		header: "Data de solicitação",
		cell: ({ row }) => {
			return (
				<span className="text-muted-foreground text-xs">
					{row.getValue("data_solicitacao")}
				</span>
			);
		},
	},
	{
		accessorKey: "data_limite",
		header: "Data limite",
		cell: ({ row }) => {
			return (
				<span className="text-muted-foreground text-xs">
					{row.getValue("data_limite")}
				</span>
			);
		},
	},
];
