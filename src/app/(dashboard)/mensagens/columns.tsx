"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Message } from "../../../../types/suap";

export const columns: ColumnDef<Message>[] = [
	{
		accessorKey: "remetente.nome",
		header: "Autor",
	},
	{
		accessorKey: "assunto",
		header: "Assunto",
	},
	{
		accessorKey: "data_envio",
		header: "Data",
		cell: ({ row }) => {
			return (
				<span className="text-muted-foreground text-xs">
					{row.getValue("data_envio")}
				</span>
			);
		},
	},
];
