import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { getSubjectIcon, getGradeColor } from "./subject-utils";
import { Subject, SubjectDetails } from "../../../types/suap";

interface SubjectCardProps {
	subject: Subject;
	details: SubjectDetails[];
	totalFrequency?: number;
	showIndividualFrequency?: boolean;
}

function ProgressBar({
	grade,
	frequency,
	hasMediaAritmetica,
}: {
	grade: number;
	frequency: number;
	hasMediaAritmetica?: boolean;
}) {
	return (
		<div className="relative w-full max-w-md h-5 rounded-full overflow-hidden border border-border">
			<div
				className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${hasMediaAritmetica ? "from-red-500/30 to-red-600/30" : "bg-card-gradient"} z-0`}
			/>
			<div
				className="absolute top-0 left-0 h-full bg-muted z-10"
				style={{ width: hasMediaAritmetica ? "75%" : "100%" }}
			/>
			{hasMediaAritmetica && (
				<div
					className="absolute top-0 right-0 h-full bg-gradient-to-b from-rose-500 to-rose-600 z-20"
					style={{ width: `${100 - frequency}%` }}
				/>
			)}
			<div
				className={`absolute top-0 left-0 h-full z-30 transition-all duration-500 ${getGradeColor(grade)}`}
				style={{ width: `${(grade / 10) * (hasMediaAritmetica ? 75 : 100)}%` }}
			/>
		</div>
	);
}

function Assessments({ details }: { details: SubjectDetails[] }) {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">Avaliações</h3>
			{details?.map((etapa, i) => (
				<div key={i} className="mb-3">
					<p className="text-sm text-muted-foreground mb-1">
						Etapa {etapa.numero_etapa}
					</p>
					<ul className="list-disc list-inside space-y-1">
						{etapa.avaliacoes?.map((avaliacao: any, i: number) => (
							<li key={i}>
								<strong>{avaliacao.tipo}</strong> ({avaliacao.sigla}):{" "}
								{avaliacao.nota ?? (
									<span className="text-muted-foreground">sem nota</span>
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export function SubjectCard({
	subject,
	details,
	showIndividualFrequency,
}: SubjectCardProps) {
	console.log(subject, details);
	const mfd = subject.medias.find((s: any) => s.tipo === "MFD")?.nota || "0,0";
	const grade = Number(mfd?.replace(",", "."));

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="cursor-pointer rounded-2xl p-5 lg:w-64 w-full h-auto min-h-56 transition-all flex flex-col duration-200 hover:scale-[1.02] bg-card-gradient border border-border">
					<h2 className="text-lg font-semibold text-foreground flex flex-1 gap-2">
						<span className="pt-1">{getSubjectIcon(subject.descricao)}</span>
						<p>{subject.descricao}</p>
					</h2>
					<p className="text-sm text-muted-foreground mt-2 font-semibold">
						Frequência:{" "}
						<span className="text-foreground">
							{subject.frequencia.toLocaleString("pt-BR", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
							%
						</span>
					</p>
					<p className="text-sm text-muted-foreground mt-2 mb-3 font-semibold">
						Nota final: <span className="text-foreground">{mfd}</span>
					</p>
					<ProgressBar
						grade={grade}
						frequency={subject.frequencia}
						hasMediaAritmetica={showIndividualFrequency}
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="bg-card-gradient max-w-xl max-h-full h-4/5 overflow-auto sm:rounded-2xl rounded-2xl border border-border">
				<DialogHeader>
					<DialogTitle>{subject.descricao}</DialogTitle>
					<DialogDescription>
						Situação:{" "}
						<span className="font-medium">{subject.situacao?.rotulo}</span>
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4 space-y-2">
					<p>
						<strong>Carga horária total:</strong> {subject.ch_total_aula}h
					</p>
					{showIndividualFrequency && (
						<p>
							<strong>Frequência:</strong>{" "}
							{subject.frequencia.toLocaleString("pt-BR")}%
						</p>
					)}
					<p>
						<strong>Faltas:</strong> {subject.qtd_faltas}
					</p>
					<p>
						<strong>Nota final (MFD):</strong> {mfd}
					</p>
				</div>
				<hr className="my-4 border-border" />
				<Assessments details={details} />
				<DialogFooter>
					<DialogClose asChild>
						<Button>Fechar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
