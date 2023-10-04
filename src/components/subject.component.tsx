import {
  Accordion,
  AccordionItem,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";

type IData = {
  nome: string;
  notas: { [index: string]: number };
}

export default function Subject({ data }: { data: IData[] }) {
  return (
    <>
      {data !== null &&
        <>
          <Accordion
            variant="splitted"
            className="sm:flex sm:w-auto w-full sm:flex-wrap gap-2 sm:justify-normal justify-center items-center px-0"
            itemClasses={{
              base: "sm:self-start sm:w-96 w-11/12 group-[.is-splitted]:shadow-none group-[.is-splitted]:px-0",
              title: "sm:truncate sm:w-44",
              trigger: "px-4"
            }}
            fullWidth={false}
          >
            {data.map((e: any, i: number) => {
              const final = (((Number(e.notas["1"] || 0) * 2) + (Number(e.notas["2"] || 0) * 2) + (Number(e.notas["3"] || 0) * 3) + (Number(e.notas["4"] || 0) * 3)) / (2 + 2 + 3 + 3));

              return (
                <AccordionItem
                  key={i}
                  startContent={<div className={`flex justify-center items-center h-10 w-10 p-5 drop-shadow-lg rounded-full bg-[--background]`}><p>{Number(final.toString().match(/^-?\d+(?:\.\d{0,1})?/)![0]).toLocaleString("pt-BR")}</p></div>}
                  title={e.nome}
                  aria-label={e.nome}
                  subtitle={<p className={`font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>{final >= 6 ? "Aprovado" : "Reprovado"}</p>}
                >
                  <div className="flex justify-center px-4">
                    <div>
                      <Table
                        fullWidth
                        removeWrapper
                        layout="fixed"
                        classNames={{
                          th: [
                            "text-xs",
                            "no-wrap",
                            "bg-[--background]",
                            "text-center",
                            "px-0",
                            "sm:px-3",
                            "whitespace-normal",
                          ],
                          td: [
                            "break-words",
                            "text-center",
                            "px-0",
                            "sm:px-3",
                          ],
                        }}
                      >
                        <TableHeader>
                          {[...Array(4)].map((_, i) => <TableColumn>{++i}° bimestre</TableColumn>)}
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            {[...Array(4)].map((_, i) => <TableCell>{Number(e.notas[`${++i}`]).toLocaleString("pt-BR")}</TableCell>)}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  {final < 6 
                  ? <>
                    <Divider className="my-2" />
                    <p className="text-xs text-center text-default-400 p-1">
                      Estimativa da nota necessária no {e.notas["1"] == "" ? "1°" : e.notas["2"] == "" ? "2°" : e.notas["3"] == "" ? "3°" : "4°"} bimestre:
                      {' '}{Number(Math.min(10, ((((6 - final) / (e.notas["1"] == "" || e.notas["2"] == "" ? 2 : 3)) * 10) / (e.notas["1"] == "" ? 3 : e.notas["2"] == "" ? 2 : 1)) + 0.05).toFixed(2)).toLocaleString("pt-BR")}
                    </p>
                  </>
                  : <></>}
                </AccordionItem>
              )
            })}
          </Accordion>
        </>}
    </>
  )
}
