import {
  Card,
  CardHeader,
  CardBody, 
  CardFooter, 
  Divider, 
  Link, 
  Image
} from "@nextui-org/react";

export function FinalGrade({ grade = { "1": 0, "2": 0, "3": 0, "4": 0 } }: { grade?: { [index: string]: number } }) {
  const final = ((((grade["1"] || 0) * 2) + ((grade["2"] || 0) * 2) + ((grade["3"] || 0) * 3) +  ((grade["4"] || 0) * 3)) / (2 + 2 + 3 + 3));

  return (
    <Card className="max-w-[280px]">
      <CardHeader className="flex justify-center">
        <p className="text-xl">{final >= 6 ? "Aprovado" : "Reprovado"}</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="text-center">Nota final: {final}</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <p className="text-xs">
          Nota necessária no {grade["1"] == 0 || grade["2"] == 0 ? "1° ou 2°" : "3° ou 4°"} bimestre:
          {' '}{Number((((6 - final) / (grade["1"] == 0 || grade["2"] == 0 ? 2 : 3)) * 10).toFixed(2)).toLocaleString("pt-BR")}
        </p>
      </CardFooter>
    </Card>
  );
}