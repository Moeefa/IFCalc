import { getSubjects, getSubjectDetails } from "@/lib/suap";
import { SubjectCard } from "@/components/subject/subject-card";
import { LegendItem } from "@/components/subject/subject-legend";
import { TotalFrequencyBar } from "@/components/subject/total-frequency-bar";

export default async function SubjectData() {
	const subjects = await getSubjects();
	const subjectsWithDetails = await Promise.all(
		subjects
			.filter((s) => s.situacao?.rotulo !== "Transferido")
			.map(async (subject) => {
				const details = await getSubjectDetails(subject.id);
				return { subject, details: details || [] };
			}),
	);

	const hasMediaAritmetica = subjectsWithDetails.every((item) =>
		item.details.every((det) =>
			det.avaliacoes.every((av) => av.forma_calculo === "Média Aritmética"),
		),
	);

	const totalCargaHoraria = subjects.reduce(
		(total, subject) => total + subject.ch_total_aula,
		0,
	);

	const frequenciaTotal =
		totalCargaHoraria > 0
			? subjects.reduce((acc, subject) => {
					return acc + subject.frequencia * subject.ch_total_aula;
				}, 0) / totalCargaHoraria
			: 0;

	return (
		<>
			<header className="flex items-center mb-5 gap-2 flex-wrap">
				<p className="text-sm font-semibold text-foreground">Legenda:</p>
				<LegendItem
					color={[
						"from-green-500 to-green-600 border-green-800",
						"from-yellow-500 to-yellow-600 border-yellow-800",
						"from-red-500 to-red-600 border-red-800",
					]}
					label="Notas"
				/>
				{hasMediaAritmetica && (
					<>
						<LegendItem
							color={["from-rose-500 to-rose-600 border-rose-700"]}
							label="Total de faltas"
						/>
						<LegendItem
							color={["from-red-500/30 to-red-600/30 border-red-600/50"]}
							label="Faltas necessárias para reprovação por frequência"
						/>
					</>
				)}
			</header>
			{!hasMediaAritmetica && <TotalFrequencyBar frequency={frequenciaTotal} />}
			<div className="flex flex-wrap gap-4">
				{subjectsWithDetails.map((item, index) => (
					<SubjectCard
						key={index}
						subject={item.subject}
						details={item.details}
						showIndividualFrequency={hasMediaAritmetica}
					/>
				))}
			</div>
		</>
	);
}
