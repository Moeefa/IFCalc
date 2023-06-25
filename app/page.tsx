'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, Tab, Divider, Accordion, AccordionItem } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import axios from 'axios';

export default function Home() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    axios.get("https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/2023/1/", {
      timeout: 10_000,
      headers: {
        Authorization: "Bearer " + session?.accessToken
      }
    })
      .then(res => setData(res.data.filter((a: any) => a.situacao !== "Transferido").reduce((a: any, b: any) => {
        return [
          ...a,
          {
            nome: b.disciplina.slice(b.disciplina.indexOf("-") + 1, b.disciplina.length).replace(/(III|II)/g, "").trim(),
            notas: {
              "1": Number(b.nota_etapa_1.nota?.replace(",", ".")),
              "2": Number(b.nota_etapa_2.nota?.replace(",", ".")),
              "3": Number(b.nota_etapa_3.nota?.replace(",", ".")),
              "4": Number(b.nota_etapa_4.nota?.replace(",", ".")),
            },
          },
        ];
      }, [])));
  }, [status, session]);

  return (
    <>
      <Tabs fullWidth variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalTab />

          {data !== null &&
            <>
              <Divider className="my-5" />
              <div className="flex justify-center w-25">
                <Accordion variant="splitted">
                  {data.map((e: any, i: number) => {
                    const final = (((Number(e.notas["1"] || 0) * 2) + (Number(e.notas["2"] || 0) * 2) + (Number(e.notas["3"] || 0) * 3) + (Number(e.notas["4"] || 0) * 3)) / (2 + 2 + 3 + 3));

                    return (
                      <AccordionItem
                        key={i}
                        startContent={
                          <div className="flex justify-center items-center h-10 w-10 p-5 bg-[#131313] rounded-full">
                            <p>
                              {final.toFixed(2)}
                            </p>
                          </div>
                        }
                        title={e.nome}
                        aria-label={e.nome}
                        subtitle={
                          <p className={`font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>{final >= 6 ? "Aprovado" : "Reprovado"}</p>
                        }
                      >
                        Teste
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </>}
        </Tab>

        <Tab key="bim" title="Média bimestral">
        </Tab>
      </Tabs>
    </>
  );
}
