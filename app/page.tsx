'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Tabs,
  Tab,
  Divider,
  Accordion,
  AccordionItem,
} from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import axios from 'axios';

export default function Home() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    axios.get("/api/grade", { signal: AbortSignal.timeout(15_000) })
      .then(res => setData(res.data));
  }, [status, session]);

  return (
    <>
      <Tabs fullWidth variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalTab />

          {data !== null &&
            <>
              <Divider className="my-5" />
              <Accordion
                variant="splitted"
                className="justify-center items-center px-0"
                fullWidth
                itemClasses={{
                  base: "w-11/12 sm:w-25",
                  startContent: "flex justify-center items-center h-10 w-10 p-5 bg-[var(--background)] drop-shadow-lg rounded-full",
                }}
              >
                {data.map((e: any, i: number) => {
                  const final = (((Number(e.notas["1"] || 0) * 2) + (Number(e.notas["2"] || 0) * 2) + (Number(e.notas["3"] || 0) * 3) + (Number(e.notas["4"] || 0) * 3)) / (2 + 2 + 3 + 3));

                  return (
                    <AccordionItem
                      key={i}
                      startContent={Number(final.toFixed(1)).toLocaleString("pt-BR")}
                      title={e.nome}
                      aria-label={e.nome}
                      subtitle={<p className={`font-semibold text-transparent bg-clip-text bg-gradient-to-b ${final >= 6 ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>{final >= 6 ? "Aprovado" : "Reprovado"}</p>}
                    >
                      <Divider className="mb-2" />
                      <div className="flex justify-center">
                        <div className="grid grid-cols-2 grid-rows-2 gap-2">
                          {[...Array(4)].map((_, i) => (
                            <p className="text-default-400">{i + 1}° BIMESTRE: <span className="text-black dark:text-white">{e.notas[`${i + 1}`]}</span></p>
                          ))}
                        </div>
                      </div>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </>}
        </Tab>

        <Tab key="bim" title="Média bimestral">
        </Tab>
      </Tabs >
    </>
  );
}
