import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

const toFixed = (n: number, precision: number) => {
  const s = `${n}`, i = `${n}`.split('.'), p = Math.max(precision | 0, 0);
  return Number(i[0] + (p ? `.${(i[1] ?? '').padEnd(p, '0')}`.slice(0, p + 1) : ''));
};

export function FinalCard({ grade = { "1": 0, "2": 0, "3": 0, "4": 0 } }: { grade?: { [index: string]: number | string } }) {
  const final = (((Number(grade["1"]) * 2) + (Number(grade["2"]) * 2) + (Number(grade["3"]) * 3) + (Number(grade["4"]) * 3)) / (2 + 2 + 3 + 3));
  const hasExceeded = Number(grade["1"]) > 10 || Number(grade["2"]) > 10 || Number(grade["3"]) > 10 || Number(grade["4"]) > 10 || Number(grade["1"]) < 0 || Number(grade["2"]) < 0 || Number(grade["3"]) < 0 || Number(grade["4"]) < 0;
  const isEmpty = grade["1"] == "" || grade["2"] == "";

  return (
    <Card shadow="none" className="sm:w-full w-11/12">
      <CardHeader className="flex justify-center">
        <p className={`text-lg`}>Nota Final</p>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-center">{hasExceeded ? "Nota inválida" : `${toFixed(Number(final), 1).toLocaleString("pt-BR", { minimumFractionDigits: 1 })}`}</p>
      </CardBody>
      {final >= 6 || hasExceeded
        ? <></>
        : <>
          <Divider />
          <CardFooter className="flex justify-center">
            <p className="text-xs text-center text-default-400">
              Estimativa da nota necessária no <span className="text-danger">{grade["1"] == "" ? "1" : grade["2"] == "" ? "2" : grade["3"] == "" ? "3" : "4"}</span>° bimestre:
              {' '}{toFixed(Number(Math.min(10, ((((6 - final) / (isEmpty ? 2 : 3)) * 10) / (grade["1"] == "" ? 3 : grade["2"] == "" ? 2 : 1)) + 0.1)), 1).toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
            </p>
          </CardFooter>
        </>}
    </Card>
  );
}

export function BimestralCard({ grade = { notas: [''], conceito: '' } }: { grade?: { notas: string[]; conceito: string; } }) {
  const final = ((grade.notas.reduce((sum, a) => Number(sum) + Number(a), 0) / grade.notas.length) * 0.8) + Number(grade.conceito);
  const hasExceeded = grade.notas.some(e => Number(e) < 0 || Number(e) > 10);

  return (
    <Card shadow="none" className="sm:w-72 w-11/12">
      <CardHeader className="flex justify-center">
        <p className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 && !hasExceeded ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>{hasExceeded ? "Inválido" : final >= 6 ? "Aprovado" : "Reprovado"}</p>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-center">{hasExceeded ? "Nota inválida" : `Nota final: ${toFixed(Number(final), 1).toLocaleString("pt-BR", { minimumFractionDigits: 1 })}`}</p>
      </CardBody>
    </Card>
  );
}

export function FreqCard({ freq }: { freq: number }) {
  return (
    <Card shadow="none" className="sm:w-full w-11/12">
      <CardHeader className="flex justify-center">
        <p className={`text-lg`}>Frequência</p>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-center">{freq ? `${freq}%` : "Sem dados"}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center">
        <p className="text-xs text-center text-default-400">
          É necessário 75% ou mais de presença para ser aprovado
        </p>
      </CardFooter>
    </Card>
  );
}
