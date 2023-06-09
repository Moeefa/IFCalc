import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export function GradeYear({ grade = { 1: 0, 2: 0, 3: 0, 4: 0 } }: { grade?: { [index: number]: number } }) {
  const final = ((((grade[1] || 0) * 2) + ((grade[2] || 0) * 2) + ((grade[3] || 0) * 3) +  ((grade[4] || 0) * 3)) / (2 + 2 + 3 + 3));

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{final >= 6 ? "Aprovado" : "Reprovado"}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Nota final: {final}</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        Nota necessária no {grade[1] == 0 || grade[2] == 0 ? "1° ou 2°" : "3° ou 4°"} bimestre:
        {Number((((6 - final) / (grade[1] == 0 || grade[2] == 0 ? 2 : 3)) * 10).toFixed(2)).toLocaleString("pt-BR")}
      </CardFooter>
    </Card>
  );
}
