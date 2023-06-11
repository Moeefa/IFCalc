import {
  Card,
  CardHeader,
  CardBody, 
  CardFooter, 
  Divider, 
  Link, 
  Image
} from "@nextui-org/react";

export function FinalGrade({ grade = { "1": 0, "2": 0, "3": 0, "4": 0 } }: { grade?: { [index: string]: number | string } }) {
  const final = (((Number(grade["1"] || 0) * 2) + (Number(grade["2"] || 0) * 2) + (Number(grade["3"] || 0) * 3) +  (Number(grade["4"] || 0) * 3)) / (2 + 2 + 3 + 3));
  const exceeded = Number(grade["1"]) > 10 || Number(grade["2"]) > 10 || Number(grade["3"]) > 10 || Number(grade["4"]) > 10 ||
                   Number(grade["1"]) < 0 || Number(grade["2"]) < 0 || Number(grade["3"]) < 0 || Number(grade["4"]) < 0;

  if (exceeded) return (
    <Card className="max-w-[280px]">
      <CardHeader className="flex justify-center">
        <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-800">Inválido</p>
      </CardHeader>
      <CardBody>
        <p className="text-center text-default-400">A nota inserida é inválida!</p>
      </CardBody>
    </Card>
  );
  
  return (
    <Card className="max-w-[280px]">
      <CardHeader className="flex justify-center">
        <p className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>{final >= 6 ? "Aprovado" : "Reprovado"}</p>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-center text-default-400">Nota final: {Number(final.toFixed(2)).toLocaleString("pt-BR")}</p>
      </CardBody>
      {final >= 6 
        ? <></>
        : <>
            <CardFooter>
              <p className="text-xs text-default-400">
                Nota necessária no {grade["1"] == "0" || grade["2"] == "0" || grade[1] == "" || grade[2] == "" ? "1° ou 2°" : "3° ou 4°"} bimestre:
                {' '}{Number((((6 - final) / (grade["1"] == "0" || grade["2"] == "0" || grade["1"] == "" || grade["2"] == "" ? 2 : 3)) * 10).toFixed(2)).toLocaleString("pt-BR")}
              </p>
            </CardFooter>
          </>}
    </Card>
  );
}
