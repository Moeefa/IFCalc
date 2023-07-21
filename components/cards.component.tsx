import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

export function FinalGrade({ grade = { "1": 0, "2": 0, "3": 0, "4": 0 } }: { grade?: { [index: string]: number | string } }) {
  const final = (((Number(grade["1"] || 0) * 2) + (Number(grade["2"] || 0) * 2) + (Number(grade["3"] || 0) * 3) + (Number(grade["4"] || 0) * 3)) / (2 + 2 + 3 + 3));
  const hasExceeded = Number(grade["1"]) > 10 || Number(grade["2"]) > 10 || Number(grade["3"]) > 10 || Number(grade["4"]) > 10 ||
    Number(grade["1"]) < 0 || Number(grade["2"]) < 0 || Number(grade["3"]) < 0 || Number(grade["4"]) < 0;
  const isEmpty = grade["1"] == "0" || grade["2"] == "0" || grade["1"] == "" || grade["2"] == "";

  return (
    <Card shadow="none" className="sm:w-72 w-11/12">
      <CardHeader className="flex justify-center">
        <p className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 && !hasExceeded ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>{hasExceeded ? "Inválido" : final >= 6 ? "Aprovado" : "Reprovado"}</p>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-center">{hasExceeded ? "Nota inválida" : `Nota final: ${Number(final.toFixed(2)).toLocaleString("pt-BR")}`}</p>
      </CardBody>
      {final >= 6 || hasExceeded
        ? <></>
        : <>
          <Divider />
          <CardFooter className="flex justify-center">
            <p className="text-xs text-center text-default-400">
              Nota necessária no {isEmpty ? "1° ou 2°" : "3° ou 4°"} bimestre:
              {' '}{Number((((6 - final) / (isEmpty ? 2 : 3)) * 10).toFixed(1)).toLocaleString("pt-BR")}
            </p>
          </CardFooter>
        </>}
    </Card>
  );
}
