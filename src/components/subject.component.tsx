import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

type IData = {
  nome: string;
  notas: { [index: string]: number };
}

const Clipboard = () => {
  return (
    <>
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1.45em" width="1.45em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
    </>
  );
}

export default function Subject({ data, setGrade }: { data: IData[], setGrade: Dispatch<SetStateAction<{ "1": string; "2": string; "3": string; "4": string; }>> }) {
  return (
    <>
      {data !== null &&
        <>
          <Accordion
            variant="splitted"
            className="sm:flex sm:w-auto w-full sm:flex-wrap gap-2 sm:justify-normal justify-center items-center px-0"
            itemClasses={{
              base: "sm:self-start sm:w-96 w-11/12 group-[.is-splitted]:shadow-none group-[.is-splitted]:px-0",
              title: "flex items-center",
              trigger: "px-4"
            }}
            fullWidth={false}
          >
            {data.map((e: any, i: number) => {
              const final = (((Number(e.notas["1"] || 0) * 2) + (Number(e.notas["2"] || 0) * 2) + (Number(e.notas["3"] || 0) * 3) + (Number(e.notas["4"] || 0) * 3)) / (2 + 2 + 3 + 3));

              return (
                <AccordionItem
                  key={i}
                  startContent={<div className={`flex justify-center items-center h-10 w-10 p-5 drop-shadow-lg rounded-full bg-background`}><p>{Number(final.toString().match(/^-?\d+(?:\.\d{0,1})?/)![0]).toLocaleString("pt-BR")}</p></div>}
                  title={<><p className="sm:truncate sm:w-44 grow">{e.nome}</p> <Button onClick={() => setGrade({ "1": e.notas["1"], "2": e.notas["2"], "3": e.notas["3"], "4": e.notas["4"] })} size="sm" variant="light" isIconOnly><Clipboard /></Button></>}
                  aria-label={e.nome}
                  subtitle={<p className={`font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 ? "from-blue-600 to-blue-800" : e.cursando ? "from-neutral-500 to-neutral-800 dark:from-neutral-200 dark:to-neutral-600" : "from-red-600 to-red-800"}`}>{final >= 6 ? "Aprovado" : e.cursando ? "Cursando" : (e.notas["1"] !== "" || e.notas["2"] !== "" && Number((((((6 - final) / (e.notas["1"] !== "" || e.notas["2"] !== "" && 3)) * 10) / (e.notas["1"] == "" ? 3 : e.notas["2"] == "" ? 2 : 1)) + 0.01).toFixed(2)) > 10) ? "Prova Final" : "Reprovado"}</p>}
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
                            "bg-background",
                            "text-center",
                            "px-0",
                            "sm:px-3",
                            "whitespace-normal",
                            "font-normal",
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
                      {' '}{Number(Math.min(10, ((((6 - final) / (e.notas["1"] == "" || e.notas["2"] == "" ? 2 : 3)) * 10) / (e.notas["1"] == "" ? 3 : e.notas["2"] == "" ? 2 : 1)) + 0.01).toFixed(2)).toLocaleString("pt-BR")}
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
