"use client";

import {
	ColumnDef,
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
import { RevealElements, RevealItem } from "@/components/reveal";
import { Message } from "../../../../types/suap";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const createPreviewItems = (rowData: TData & Message): RevealItem[] => {
		return [
			{
				content: (
					<div className="p-4 bg-card-gradient rounded-2xl shadow-lg border border-border max-w-sm">
						<h3 className="text-lg font-bold">{rowData.assunto}</h3>
						<p
							className="text-sm max-h-20 h-20 line-clamp-4 overflow-hidden text-muted-foreground"
							dangerouslySetInnerHTML={{ __html: rowData.conteudo }}
						></p>
					</div>
				),
				rotate: Math.floor(Math.random() * 4) - 2,
				translateX: "-10px",
				translateY: "70px",
				transformOrigin: "top left",
				delay: 0.1,
			},
		];
	};

	return (
		<div className="overflow-hidden rounded-2xl border bg-card-gradient font-semibold">
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => {
							const previewItems = createPreviewItems(
								row.original as TData & Message,
							);

							return (
								<Sheet key={row.id}>
									<RevealElements
										items={previewItems}
										offsetX={20}
										offsetY={-50}
									>
										{(triggerProps) => (
											<SheetTrigger asChild>
												<TableRow
													{...triggerProps}
													data-state={row.getIsSelected() && "selected"}
													className="hover:bg-muted/50 transition-colors cursor-pointer"
												>
													{row.getVisibleCells().map((cell) => (
														<TableCell
															key={cell.id}
															className="px-4 sm:py-2 py-6"
														>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext(),
															)}
														</TableCell>
													))}
												</TableRow>
											</SheetTrigger>
										)}
									</RevealElements>

									<SheetContent className="overflow-auto">
										<SheetHeader>
											<h2 className="text-lg font-bold">
												{(row.original as TData & Message).assunto}
											</h2>
											<p className="font-semibold text-muted-foreground text-sm">
												{(row.original as TData & Message).remetente.nome}
												<br />
												{(row.original as TData & Message).remetente.email}
											</p>
											<p className="text-xs text-muted-foreground">
												{(row.original as TData & Message).data_envio}
											</p>
										</SheetHeader>
										<div className="p-4">
											<p
												className="text-sm text-muted-foreground"
												dangerouslySetInnerHTML={{
													__html: (row.original as TData & Message).conteudo,
												}}
											></p>
										</div>
									</SheetContent>
								</Sheet>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Nenhum resultado
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
