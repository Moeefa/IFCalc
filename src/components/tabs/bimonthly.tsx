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

export default function Bimonthly() {
	const [inputs, setInputs] = useState<number[]>([0, 0]);

	const total = (inputs[0] || 0) * 0.8 + (inputs[1] || 0);
	const result = Math.max(Math.min(total, 10), 0);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setInputs((prevState) => {
			const index = Number(e.target.id);
			const value = Number(e.target.value.replace(",", "."));

			const newInputs = [...prevState];
			newInputs[index] = value;

			return newInputs;
		});

	return (
		<TextureCardStyled className="h-96">
			<TextureCardHeader className="p-4">
				<TextureCardTitle>Média bimestral</TextureCardTitle>
				<TextureCardDescription>
					Cálculo da nota de um bimestre somado com o conceito.
				</TextureCardDescription>
			</TextureCardHeader>
			<TextureCardContent className="space-y-2">
				<div className="flex gap-4">
					<div className="space-y-1 w-full">
						<Label htmlFor="grade-b">Nota</Label>
						<Input
							id="0"
							type="number"
							min={0}
							max={10}
							data-invalid={inputs[0] < 0 || inputs[0] > 10}
							className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500 data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
							onChange={handleChange}
							placeholder="Entre 0 e 10"
						/>
					</div>
					<div className="space-y-1 w-full">
						<Label htmlFor="conc-b">Conceito</Label>
						<Input
							id="1"
							type="number"
							min={0}
							max={2}
							data-invalid={inputs[1] < 0 || inputs[1] > 2}
							className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500 data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
							onChange={handleChange}
							placeholder="Entre 1 e 2"
						/>
					</div>
				</div>
			</TextureCardContent>
			<TextureCardFooter className="mt-auto flex rounded-b-[20px] border-t border-border flex-col pt-4 items-center justify-center dark:bg-neutral-800 bg-stone-100">
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					{Number(result.toPrecision(2)) < 6 ? "Reprovado" : "Aprovado"}
				</h4>
				<small className="text-sm font-medium leading-none text-muted-foreground">
					Nota bimestral:{" "}
					{Number(result.toPrecision(2)).toLocaleString("pt-BR", {
						maximumFractionDigits: 1,
					})}
				</small>
			</TextureCardFooter>
		</TextureCardStyled>
	);
}
