"use client";

import { type ChangeEvent, useState } from "react";
import {
	TextureCardContent,
	TextureCardDescription,
	TextureCardFooter,
	TextureCardHeader,
	TextureCardStyled,
	TextureCardTitle,
} from "@/components/ui/texture-card";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Yearly() {
	const [inputs, setInputs] = useState<number[]>([]);

	const sum = inputs.reduce((a, b, i) => a + (i > 1 ? b * 3 : b * 2) || 0, 0);
	const total = sum / (2 + 2 + 3 + 3);
	const result = Math.max(Math.min(total, 10), 0);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setInputs((prevState) => {
			const index = Number(e.target.dataset.index);
			const value = Number(e.target.value.replace(",", "."));

			const newInputs = [...prevState];
			newInputs[index] = value;

			return newInputs;
		});

	return (
		<TextureCardStyled className="h-full">
			<TextureCardHeader className="p-4">
				<TextureCardTitle>Média anual</TextureCardTitle>
				<TextureCardDescription>
					Cálculo da média ponderada das notas de cada bimestre.
				</TextureCardDescription>
			</TextureCardHeader>
			<TextureCardContent className="space-y-2">
				<div className="grid grid-cols-2 gap-2 gap-x-4">
					{[...Array(4)].map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div className="space-y-1" key={i}>
							<Label htmlFor={`grade-${i + 1}-y`}>{i + 1}º</Label>
							<Input
								type="number"
								data-index={i}
								data-invalid={inputs[i] < 0 || inputs[i] > 10}
								className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500 data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
								onChange={handleChange}
								id={`grade-${i + 1}-y`}
								placeholder="Entre 0 e 10"
							/>
						</div>
					))}
				</div>
			</TextureCardContent>
			<TextureCardFooter className="mt-auto flex rounded-b-[20px] border-t border-border flex-col pt-4 items-center justify-center dark:bg-neutral-800 bg-stone-100">
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					{Number(result.toPrecision(2)) < 6 ? "Reprovado" : "Aprovado"}
				</h4>
				<small className="text-sm font-medium leading-none text-muted-foreground">
					Nota final:{" "}
					{Number(result.toPrecision(2)).toLocaleString("pt-BR", {
						maximumFractionDigits: 1,
					})}
				</small>
			</TextureCardFooter>
		</TextureCardStyled>
	);
}
