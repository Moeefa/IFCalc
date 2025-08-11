interface LegendItemProps {
	color: string[];
	label: string;
}

export function LegendItem({ color, label }: LegendItemProps) {
	return (
		<div className="text-sm text-center font-semibold text-foreground flex items-center gap-1">
			{color.map((c, index) => (
				<div
					key={index}
					className={`bg-gradient-to-b ${c} size-4 rounded-full border`}
				/>
			))}
			{label}
		</div>
	);
}

export function SubjectLegend() {
	return (
		<>
			<LegendItem
				color={[
					"from-green-500 to-green-600 border-green-800",
					"from-yellow-500 to-yellow-600 border-yellow-800",
					"from-red-500 to-red-600 border-red-800",
				]}
				label="Notas"
			/>
			<LegendItem
				color={["from-rose-500 to-rose-600 border-rose-700"]}
				label="Total de faltas"
			/>
			<LegendItem
				color={["from-red-500/30 to-red-600/30 border-red-600/50"]}
				label="Faltas necessárias para reprovação por frequência"
			/>
		</>
	);
}
