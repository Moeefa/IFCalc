"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Material } from "../../../../types/suap";

export const columns: ColumnDef<Material>[] = [
	{
		accessorKey: "descricao",
		header: "Nome",
		cell: ({ row }) => {
			const descricao = row.getValue("descricao") as string;
			return (
				<span className="text-muted-foreground">
					{descricao || row.original?.url.split("/").pop() || "Sem descrição"}
				</span>
			);
		},
	},
	{
		accessorKey: "diario.disciplina.nome",
		header: "Disciplina",
	},
	{
		accessorKey: "url",
		header: "Tipo",
		cell: ({ row }) => {
			const url = row.getValue("url") as string;
			return (
				<span className="text-muted-foreground text-xs">
					{url ? url.split(".").pop()?.toUpperCase() : "N/A"}
				</span>
			);
		},
	},
	{
		accessorKey: "data",
		header: "Data",
		cell: ({ row }) => {
			return (
				<span className="text-muted-foreground text-xs">
					{row.getValue("data")}
				</span>
			);
		},
	},
];
