"use client";

import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectItem,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import {
	CALCULATOR_MODES,
	GRADE_CONFIG,
	type CalculatorMode,
} from "@/lib/constants";
import { CircleInfoIcon } from "@/components/icons/circle-info";
import { MinusIcon } from "@/components/icons/minus";
import { PlusIcon } from "@/components/icons/plus";

export default function Page() {
	const [mode, setMode] = useState<CalculatorMode>("b");
	const [grades, setGrades] = useState<string[]>([""]);
	const [participation, setParticipation] = useState<string>("");
	const [average, setAverage] = useState<number | null>(null);

	const handleModeChange = (value: CalculatorMode) => {
		setMode(value);
		value === "a" ? setGrades(["", "", "", ""]) : setGrades([""]);

		setParticipation("");
		setAverage(null);
	};

	const handleGradeChange = (index: number, value: string) => {
		const updated = [...grades];
		updated[index] = value;
		setGrades(updated);
	};

	const addGradeField = () => {
		setGrades([...grades, ""]);
	};

	const removeGradeField = () => {
		if (grades.length > 1) {
			setGrades(grades.slice(0, -1));
		}
	};

	const calculateAverage = useCallback(() => {
		const numericGrades = grades
			.map((g) => parseFloat(g || "0"))
			.filter((n) => !isNaN(n));

		let result = 0;

		if (mode === "b") {
			const gradeSum =
				numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length;
			const participationScore = parseFloat(participation);
			const participationValid = !isNaN(participationScore)
				? participationScore
				: 0;
			result =
				gradeSum * GRADE_CONFIG.BIMESTRAL_MULTIPLIER + participationValid;
		} else if (mode === "s") {
			const sum = numericGrades.reduce((a, b) => a + b, 0);
			const count = numericGrades.length;
			result = count > 0 ? sum / count : 0;
		} else if (mode === "a") {
			const weights = GRADE_CONFIG.ANNUAL_WEIGHTS;
			let weightedSum = 0;
			let totalWeight = 0;

			for (let i = 0; i < numericGrades.length && i < 4; i++) {
				weightedSum += numericGrades[i] * weights[i];
				totalWeight += weights[i];
			}

			result = totalWeight > 0 ? weightedSum / totalWeight : 0;
		}

		setAverage(result);
	}, [grades, participation, mode]);

	const isPassed = average !== null && average >= GRADE_CONFIG.PASSING_GRADE;

	const modeLabel = (index: number) => {
		if (mode === "b") return `${index + 1}ª nota`;
		if (mode === "s") return `${index + 1}º semestre`;
		return `${index + 1}º bimestre`;
	};

	useEffect(() => {
		calculateAverage();
	}, [calculateAverage]);

	return (
		<div className="bg-card-gradient flex flex-col h-full w-full rounded-2xl border border-border">
			<div className="flex-1">
				<div className="px-5 pt-5">
					<div className="flex flex-wrap gap-2 items-center justify-between">
						<div className="flex w-full justify-between items-center gap-2 flex-wrap">
							<Select
								onValueChange={(v) => handleModeChange(v as CalculatorMode)}
								value={mode}
							>
								<SelectTrigger className="px-0 text-2xl shadow-none font-semibold w-fit py-5 border-none">
									<SelectValue placeholder="Bimestral" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem className="font-semibold" value="b">
										{CALCULATOR_MODES.b.label}
									</SelectItem>
									<SelectItem className="font-semibold" value="s">
										{CALCULATOR_MODES.s.label}
									</SelectItem>
									<SelectItem className="font-semibold" value="a">
										{CALCULATOR_MODES.a.label}
									</SelectItem>
								</SelectContent>
							</Select>

							{mode !== "a" && (
								<div className="flex items-center gap-2">
									<Button
										className="rounded-full text-foreground text-sm size-9 flex items-center gap-1"
										onClick={addGradeField}
									>
										<div>
											<PlusIcon className="size-4" />
										</div>
									</Button>
									<Button
										className="rounded-full text-foreground bg-red-500 text-sm size-9 flex items-center gap-1"
										onClick={removeGradeField}
										disabled={grades.length <= 1}
									>
										<div>
											<MinusIcon className="size-4" />
										</div>
									</Button>
								</div>
							)}
						</div>

						<Tooltip>
							<p className="flex items-center font-semibold text-muted-foreground text-sm space-x-1">
								<span>{CALCULATOR_MODES[mode].description}</span>
								<TooltipTrigger>
									<CircleInfoIcon className="size-4" />
								</TooltipTrigger>
							</p>
							<TooltipContent className="rounded-2xl border border-border bg-gradient-to-b text-[hsl(49_43%_93%)] dark:text-[hsl(0_0%_18%)] from-[hsl(0_0%_10%)] to-[hsl(240_6%_8%)] dark:from-[hsl(0_0%_98%)] dark:to-[hsl(0_0%_97%)]">
								<p className="text-xs font-semibold w-64">
									{CALCULATOR_MODES[mode].details}
								</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>

				<div className="mt-5 p-5 max-w-xl grid grid-cols-2 gap-4 items-center">
					{grades.map((grade, index) => (
						<div key={index}>
							<p className="mb-1 font-semibold">{modeLabel(index)}</p>
							<Input
								type="number"
								placeholder="Digite a nota"
								className="w-full font-semibold"
								value={grade}
								onChange={(e) => handleGradeChange(index, e.target.value)}
							/>
						</div>
					))}

					{mode === "b" && (
						<div>
							<p className="mb-1 font-semibold">Conceito</p>
							<Input
								type="number"
								placeholder="Nota de conceito"
								className="w-full font-semibold"
								value={participation}
								onChange={(e) => setParticipation(e.target.value)}
							/>
						</div>
					)}
				</div>
			</div>

			<Separator className="my-5" />

			{average !== null && (
				<div className="pb-5 px-5 flex flex-col items-center justify-center">
					<p
						className={`text-2xl font-semibold ${isPassed ? "text-green-500" : "text-red-500"}`}
					>
						{isPassed ? "Aprovado" : "Reprovado"}
					</p>
					<p className="font-semibold">
						Média Final:{" "}
						{average.toLocaleString("pt-BR", {
							maximumFractionDigits: 2,
						})}
					</p>
				</div>
			)}
		</div>
	);
}
