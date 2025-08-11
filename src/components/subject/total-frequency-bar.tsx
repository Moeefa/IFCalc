interface TotalFrequencyBarProps {
	frequency: number;
}

export function TotalFrequencyBar({ frequency }: TotalFrequencyBarProps) {
	const getFrequencyColor = (freq: number) => {
		if (freq >= 90) {
			return "bg-gradient-to-b from-green-500 to-green-600";
		} else if (freq >= 75) {
			return "bg-gradient-to-b from-yellow-500 to-yellow-600";
		} else {
			return "bg-gradient-to-b from-red-500 to-red-600";
		}
	};

	return (
		<div className="w-full mb-6 p-4 rounded-2xl bg-card-gradient border border-border">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-lg font-semibold text-foreground">
					Frequência total (mínimo 75%)
				</h3>
				<span className={`text-lg font-bold`}>
					{frequency.toLocaleString("pt-BR", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
					%
				</span>
			</div>
			<div className="relative w-full h-5 rounded-full overflow-hidden bg-muted border border-border">
				<div
					className={`h-full transition-all duration-500 ${getFrequencyColor(frequency)}`}
					style={{ width: `${Math.min(frequency, 100)}%` }}
				/>
			</div>
		</div>
	);
}
