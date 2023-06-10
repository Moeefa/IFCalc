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

  return (
    <Card className="max-w-[280px]">
      <CardHeader className="flex justify-center">
        <p className="text-xl">{final >= 6 ? "Aprovado" : "Reprovado"}</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="text-center">Nota final: {Number(final.toFixed(2)).toLocaleString("pt-BR")}</p>
      </CardBody>
      {final >= 6 
        ? <></>
        : <>
            <Divider/>
            <CardFooter>
              <p className="text-xs">
                Nota necessária no {grade["1"] == "0" || grade["2"] == "0" || grade[1] == "" || grade[2] == "" ? "1° ou 2°" : "3° ou 4°"} bimestre:
                {' '}{Number((((6 - final) / (grade["1"] == "0" || grade["2"] == "0" || grade["1"] == "" || grade["2"] == "" ? 2 : 3)) * 10).toFixed(2)).toLocaleString("pt-BR")}
              </p>
            </CardFooter>
          </>}
    </Card>
  );
}
