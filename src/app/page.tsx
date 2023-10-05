'use client';

import { BimestralCard, FinalCard } from '@/src/components/cards.component';
import {
  Button,
  Divider,
  Input,
  ScrollShadow,
  Skeleton,
} from '@nextui-org/react';

import Subject from '@/src/components/subject.component';
import { Type } from '@/types/index.d';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useTabContext } from '@/src/context/tab';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [grade, setGrade] = useState({ "1": "", "2": "", "3": "", "4": "" });
  const [bim, setBim] = useState({ "notas": [""], "conceito": "" });
  
  const { status } = useSession();
  const { data, error, isLoading } = useSWR(() => status === "authenticated" ? "/api/grade" : null, fetcher);
  const { active, setActive } = useTabContext();

  switch (active) {
    case Type.BIMESTRAL:    
      const state = Number(bim.conceito) < 0 || Number(bim.conceito) > 2 ? "invalid" : "valid"
    
      const updateField = (index: number, e: string = '') => {
        let copy = [...bim.notas];
        copy[index] = e;
    
        setBim({ ...bim, notas: copy });
      }
      
      return (
        <>
          <div className="flex justify-center">
            <div className="w-11/12 flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-2">
              {bim.notas.map((e, i) => {
                const state = Number(e) >= 0 && Number(e) <= 10 ? "valid" : "invalid";
              
                return (
                  <Input
                    size="md"
                    key={`${i + 1}_grade`}
                    variant="flat"
                    type="number"
                    label={`${i + 1}ª nota`}
                    color={state === "valid" ? "default" : "danger"}
                    errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                    value={e}
                    placeholder="Insira sua nota"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField(i, e.target.value)}
                    className="sm:w-48"
                    classNames={{
                      inputWrapper: [
                        "bg-content1",
                        "shadow-none"
                      ],
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 justify-center mb-10">
            <Button 
              color="primary" 
              radius="full" 
              isIconOnly 
              isDisabled={bim.notas.length >= 10}
              onPress={() => {
                let copy = bim.notas;
                copy.push('');
                
                setBim({ ...bim, notas: copy }); 
              }}
            >
              +
            </Button>
            <Button
              color="danger" 
              radius="full" 
              isIconOnly
              isDisabled={bim.notas.length <= 1}
              onPress={() => {
                let copy = bim.notas;
                copy.pop();
                
                setBim({ ...bim, notas: copy }); 
              }}>
                -
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="w-11/12 sm:w-auto mb-3">
              <Input
                size="md"
                key="conceito"
                variant="flat"
                type="number"
                label="Conceito"
                color={state === "valid" ? "default" : "danger"}
                errorMessage={state === "invalid" && "Insira um número entre 0 e 2"}
                value={bim.conceito}
                placeholder="Insira seu conceito"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBim({ ...bim, conceito: e.target.value })}
                classNames={{
                  inputWrapper: [
                    "bg-content1",
                    "shadow-none"
                  ],
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <BimestralCard grade={bim} />
          </div>
        </>
      );
    case Type.FINAL:
      return (
        <>
          <div className="sm:flex sm:justify-center gap-10">
            <div className="flex flex-col sm:justify-normal justify-center w-full sm:w-auto">
              <div className="flex justify-center sm:block">
                <div className="w-11/12 sm:w-full grid grid-cols-2 grid-rows-2 gap-3 mb-2">
                  {[...Array(4)].map((_, i) => {
                    const value = grade[(`${i + 1}`) as keyof typeof grade];
                    const state = Number(value) >= 0 && Number(value) <= 10 ? "valid" : "invalid";

                    return (
                      <Input
                        key={`${i + 1}_bim`}
                        variant="flat"
                        size="md"
                        classNames={{
                          inputWrapper: [
                            "bg-content1",
                            "shadow-none",
                          ],
                        }}
                        type="number"
                        label={`${i + 1}º bimestre`}
                        color={state === "valid" ? "default" : "danger"}
                        errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                        value={value}
                        placeholder="Insira sua nota"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGrade({ ...grade, [`${i + 1}`]: event.target.value })}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center">
                <FinalCard grade={grade} />
              </div>
            </div>

            <Divider className="my-4 sm:hidden" />
            {status === "authenticated"
              ? <>
                  <ScrollShadow hideScrollBar className="sm:w-auto sm:pb-[2em] sm:pr-[2em] sm:h-[calc(100vh-12.5em)] sm:min-h-[16em]">
                    {isLoading ? <div className="flex justify-center"><Skeleton className="rounded-medium w-11/12 sm:w-96 h-20 px-4" /></div> : <Subject data={data} />}
                  </ScrollShadow>
                </>
              : <></>}
          </div>
        </>
      );
  }
}