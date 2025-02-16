import type {
	ReportResponse,
	SuapResponse,
	Subject,
} from "@/../types/responses";
import {
	TextureCardContent,
	TextureCardStyled,
} from "@/components/ui/texture-card";

import { AverageBadge } from "@/components/average-badge";
import { Badge } from "@/components/ui/badge";
import List from "@/app/subjects/list";
import { PencilRuler } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/auth";

async function getData(): Promise<ReportResponse> {
	const session = await auth();

	/*
	 * If the user isn't authenticated, we return an "Unauthorized" message.
	 */
	if (!session) return "Unauthorized";

	/*
	 * We get the periods from the API to get the most recent period.
	 * If the user doesn't have any periods, we return a "Not Found" message.
	 */
	const periods = await getPeriods();

	if (periods === "Unauthorized") return "Unauthorized";
	if (periods === "Not Found") return "Not Found";

	/*
	 * We fetch the data from the API and test for each period if the data is valid.
	 * It isn't caching the response so we can get the most recent data.
	 * If the response contains a `detail` key, it means that the API returned an error or didn't find any data.
	 * Currently handling it as a "Not Found" message only.
	 */
	let data: SuapResponse[] & { detail?: string } = [];
	let period: { periodo_letivo: number; ano_letivo: number } = {
		periodo_letivo: 1,
		ano_letivo: new Date().getFullYear(),
	};

	console.log(session.access_token);

	for (const p of periods) {
		const res = await fetch(
			`https://suap.${
				session?.provider ?? "ifmt"
			}.edu.br/api/edu/meu-boletim/${p.ano_letivo}/${p.periodo_letivo}/`,
			{
				method: "GET",
				cache: "no-store",
				signal: AbortSignal.timeout(15_000),
				headers: {
					Authorization: `Bearer ${session.access_token}`,
				},
			},
		);

		if (res.status !== 404) {
			period = p;
			data = await res.json();
			break;
		}
	}

	if (data.detail) return "Not Found";

	/*
	 * Filter out the subjects that have been transferred to another course.
	 * Then we map the subjects to an array of objects with a simplified and readable structure.
	 */
	const filtered = data.filter((a) => a.situacao !== "Transferido");
	const subjects = filtered.reduce((a: Subject[], b) => {
		/*
		 * Create an array with the grades of each bimester and replace the comma with a dot to parse it to a number later.
		 */
		const grades = [
			b.nota_etapa_1.nota,
			b.nota_etapa_2.nota,
			b.nota_etapa_3.nota,
			b.nota_etapa_4.nota,
		].map((a) =>
			typeof a === "string" ? a.replace(",", ".") : (a / 10).toFixed(1),
		);

		a.push({
			id: b.codigo_diario,
			/*
			 * Get the name of the subject and remove the roman numerals from the end.
			 */
			name: b.disciplina
				.slice(b.disciplina.indexOf("-") + 1, b.disciplina.length)
				.replace(/I{1,3}$/, "")
				.trim(),
			grades,
			/*
			 * Get the final grade of the subject and replace the comma with a dot to parse it to a number later.
			 * If the final grade is empty, we calculate it based on the grades.
			 */
			weightedAverage:
				b.media_final_disciplina?.replace(",", ".") ||
				(
					grades
						.map((a) => Number(a))
						.reduce((a, b, i) => a + (i > 1 ? b * 3 : b * 2), 0) / 10
				) // 2 + 2 + 3 + 3 = 10 (sum of the weights)
					.toFixed(1),
			average:
				b.media_final_disciplina?.replace(",", ".") ||
				(
					grades.map((a) => Number(a)).reduce((a, b) => a + b, 0) /
					(grades.filter((a) => a !== "").length || 1)
				).toFixed(1),
			frequency: b.percentual_carga_horaria_frequentada,
			studying: grades.every((a) => a === "" || a === null),
		});

		return a;
	}, []);

	return { subjects, period };
}

async function getPeriods() {
	const session = await auth();

	/*
	 * If the user isn't authenticated, we return an "Unauthorized" message.
	 */
	if (!session) return "Unauthorized";

	/*
	 * We fetch the periods from the API and parse it to JSON.
	 */
	const res = await fetch(
		`https://suap.${
			session?.provider ?? "ifmt"
		}.edu.br/api/v2/minhas-informacoes/meus-periodos-letivos/`,
		{
			method: "GET",
			cache: "default",
			signal: AbortSignal.timeout(15_000),
			headers: {
				Authorization: `Bearer ${session.access_token}`,
			},
		},
	);

	const data: { detail?: string } & {
		periodo_letivo: number;
		ano_letivo: number;
	}[] = await res.json();

	/*
	 * If the response contains a `detail` key, it means that the API returned an error or didn't find any data.
	 * Currently handling it as a "Not Found" message only.
	 */
	if (data.detail) return "Not Found";

	return data;
}

export default async function Data() {
	const data = await getData();

	const Subjects = () => {
		if (data === "Unauthorized")
			return (
				<div className="flex items-center justify-center h-full">
					<p className="leading-7 max-w-48 text-center text-pretty">
						Entre com o SUAP para visualizar suas matérias e notas
					</p>
				</div>
			);

		if (data === "Not Found")
			return (
				<div className="flex items-center justify-center h-full">
					<p className="leading-7 max-w-48 text-center text-pretty">
						Nenhuma matéria encontrada
					</p>
				</div>
			);

		return (
			<ScrollArea className="rounded-[20px] h-full">
				<List data={data.subjects} />
			</ScrollArea>
		);
	};

	return (
		<>
			<h4 className="text-sm font-medium leading-none px-3 py-3 h-3 mb-2 flex gap-2">
				Matérias <PencilRuler className="w-4 h-4" />{" "}
				{typeof data !== "string" && (
					<Badge className="h-4">
						{data.period.ano_letivo}/{data.period.periodo_letivo}
					</Badge>
				)}
			</h4>
			<AverageBadge />

			<TextureCardStyled className="w-full h-96 [&>div>div]:!block [&>div>div]:w-full [&>div>div]:h-full [&>div>div>div]:h-full">
				<TextureCardContent className="h-full w-full p-0">
					<Subjects />
				</TextureCardContent>
			</TextureCardStyled>
		</>
	);
}
