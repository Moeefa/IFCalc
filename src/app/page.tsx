"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChangeEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilRuler } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

export default function Home() {
  const [inputs, setInputs] = useState<{ [index: string]: number }>({});
  const { data, error, isLoading } = useSWR("/api/report");

  const yearly = Math.max(
    Math.min(
      [...Array(4)]
        .map((_, i) => Number(inputs[`grade-${i + 1}-y`] || 0))
        .reduce((a, b, i) => a + (i > 1 ? b * 3 : b * 2) || 0, 0) /
        (2 + 2 + 3 + 3),
      10
    ),
    0
  );
  const bimonthly = Math.max(
    Math.min((inputs["grade-b"] || 0) * 0.8 + (inputs["conc-b"] || 0), 10),
    0
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.id]: Number(e.target.value.replace(",", ".")),
    }));

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-center sm:gap-6 gap-12 sm:h-[24.938rem]">
        <Tabs defaultValue="yearly" className="sm:w-[400px] w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="yearly">Anual</TabsTrigger>
            <TabsTrigger value="bimonthly">Bimestral</TabsTrigger>
          </TabsList>
          <TabsContent value="yearly">
            <Card>
              <CardHeader>
                <CardTitle>Média anual</CardTitle>
                <CardDescription>
                  Cálculo da média ponderada das notas de cada bimestre.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 gap-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div className="space-y-1" key={i}>
                      <Label htmlFor={`grade-${i + 1}-y`}>{i + 1}º</Label>
                      <Input
                        type="number"
                        data-invalid={
                          inputs[`grade-${i + 1}-y`] < 0 ||
                          inputs[`grade-${i + 1}-y`] > 10
                        }
                        className="data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
                        onChange={handleChange}
                        id={`grade-${i + 1}-y`}
                        placeholder="Entre 0 e 10"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col border-t pt-4 items-center justify-center">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {Number(yearly.toPrecision(2)) < 6 ? "Reprovado" : "Aprovado"}
                </h4>
                <small className="text-sm font-medium leading-none text-muted-foreground">
                  Nota final:{" "}
                  {Number(yearly.toPrecision(2)).toLocaleString("pt-BR", {
                    maximumFractionDigits: 1,
                  })}
                </small>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="bimonthly">
            <Card>
              <CardHeader>
                <CardTitle>Média bimestral</CardTitle>
                <CardDescription>
                  Cálculo da nota de um bimestre somado com o conceito.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="grade-b">Nota</Label>
                    <Input
                      id="grade-b"
                      data-invalid={
                        inputs["grade-b"] < 0 || inputs["grade-b"] > 10
                      }
                      className="data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
                      onChange={handleChange}
                      placeholder="Entre 0 e 10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="conc-b">Conceito</Label>
                    <Input
                      id="conc-b"
                      data-invalid={
                        inputs["conc-b"] < 0 || inputs["conc-b"] > 2
                      }
                      className="data-[invalid=true]:border-red-700 data-[invalid=true]:ring-red-300"
                      onChange={handleChange}
                      placeholder="Entre 1 e 2"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col border-t pt-4 items-center justify-center">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {Number(bimonthly.toPrecision(2)) < 6
                    ? "Reprovado"
                    : "Aprovado"}
                </h4>
                <small className="text-sm font-medium leading-none text-muted-foreground">
                  Nota bimestral:{" "}
                  {Number(bimonthly.toPrecision(2)).toLocaleString("pt-BR", {
                    maximumFractionDigits: 1,
                  })}
                </small>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="block sm:hidden absolute left-0 bottom-[25.5rem] m-auto border-b w-full h-5"></div>

        <div className="flex flex-col items-center min-w-72 h-[24.938rem]">
          <h4 className="text-sm font-medium leading-none px-3 py-3 h-9 mb-2 flex gap-2">
            Matérias <PencilRuler className="w-4 h-4" />
          </h4>
          <ScrollArea className="w-full sm:h-full h-96 rounded-xl border shadow [&_>_div_>_div]:!block [&_>_div_>_div]:w-full">
            <Accordion type="single" collapsible>
              {isLoading || error ? (
                [...Array(7)].map((_, i) => {
                  return (
                    <AccordionItem key={i} value={`skel-${i}`}>
                      <AccordionTrigger disabled className="px-4 space-x-2">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex flex-col gap-1 w-1/2 flex-1">
                          <Skeleton className="h-5 min-w-44" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </AccordionTrigger>
                    </AccordionItem>
                  );
                })
              ) : data === "Unauthorized" ? (
                <div className="flex items-center justify-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mt-6 max-w-48 text-center">
                    Entre com o SUAP para visualizar suas matérias e notas.
                  </p>
                </div>
              ) : data === "Não encontrado." ? (
                <div className="flex items-center justify-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mt-6 max-w-48 text-center">
                    Nenhuma matéria encontrada.
                  </p>
                </div>
              ) : (
                data?.subjects.map((subject: any, i: number) => (
                  <AccordionItem
                    className="last:border-none"
                    key={i}
                    value={subject.name}
                  >
                    <AccordionTrigger className="flex justify-start px-4 gap-2 w-full hover:no-underline">
                      <span className="flex text-xs items-center justify-center bg-secondary w-9 h-9 rounded-full hover:bg-muted/50">
                        {Number(subject.final).toLocaleString("pt-BR")}
                      </span>
                      <div className="flex flex-col w-1/2 flex-1">
                        <p className="truncate text-left text-base flex-1">
                          {subject.name}
                        </p>
                        <p className="truncate text-left text-xs">
                          {subject.final < 6 ? "Reprovado" : "Aprovado"}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="w-full px-4">
                      <Table className="w-full">
                        <TableCaption>Notas bimestrais</TableCaption>
                        <TableHeader className="[&_tr]:border-none [&_tr]:bg-muted [&_tr>th]:text-muted-foreground [&_tr]:rounded-xl [&_tr>th:first-child]:rounded-l-xl [&_tr>th:last-child]:rounded-r-xl [&_tr>th]:h-9">
                          <TableRow>
                            {[...Array(4)].map((_, i) => (
                              <TableHead
                                key={i}
                                className="text-center text-xs"
                              >
                                {i + 1}º
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr>td:first-child]:rounded-l-xl [&_tr>td:last-child]:rounded-r-xl [&_tr>td]:h-9">
                          <TableRow className="hover:bg-transparent">
                            {[...Array(4)].map((_, i) => (
                              <TableCell
                                key={i}
                                className="font-medium text-center"
                              >
                                {Number(subject.grades[i]).toLocaleString(
                                  "pt-BR"
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
