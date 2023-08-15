'use client';

import { BimestralCard, FinalCard } from '@/src/components/cards.component';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

export function FinalTab() {
  const [grade, setGrade] = useState({
    "1": "",
    "2": "",
    "3": "",
    "4": "",
  });

  return (
    <>
      <div className="flex justify-center w-full sm:w-auto">
        <div className="w-11/12 sm:w-auto sm:flex grid grid-cols-2 grid-rows-2 gap-3 mb-2">
          {[...Array(4)].map((_, i) => {
            const value = grade[(`${i + 1}`) as keyof typeof grade];
            const state = Number(value) >= 0 && Number(value) <= 10 ? "valid" : "invalid";

            return (
              <Input
                key={`${i + 1}_bim`}
                variant="flat"
                size="md"
                className="w-35"
                classNames={{
                  inputWrapper: [
                    "bg-content1",
                    "shadow-none"
                  ],
                }}
                type="number"
                label={`${i + 1}º bimestre`}
                color={state === "valid" ? "default" : "danger"}
                validationState={state}
                errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                value={value as string}
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
    </>
  );
}

export function BimTab() {
  const [grade, setGrade] = useState<{notas: string[], conceito: string}>({
    "notas": [""],
    "conceito": "",
  });

  const state = Number(grade.conceito) < 0 || Number(grade.conceito) > 2 ? "invalid" : "valid"

  const updateField = (index: number, e: string = '') => {
    let copy = [...grade.notas];
    copy[index] = e;

    setGrade({ ...grade, notas: copy });
  }
  
  return (
    <>
      <div className="flex justify-center w-full sm:w-auto">
        <div className="w-11/12 flex flex-wrap justify-center gap-3 mb-2">
          {grade.notas.map((e, i) => {
            const state = Number(e) >= 0 && Number(e) <= 10 ? "valid" : "invalid";
          
            return (
              <Input
                size="md"
                key={`${i + 1}_grade`}
                variant="flat"
                className="w-35"
                classNames={{
                  inputWrapper: [
                    "bg-content1",
                    "shadow-none"
                  ],
                }}
                type="number"
                label={`${i + 1}ª nota`}
                color={state === "valid" ? "default" : "danger"}
                validationState={state}
                errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                value={e}
                placeholder="Insira sua nota"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField(i, e.target.value)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 justify-center mb-3">
        <Button 
          color="primary" 
          radius="full" 
          isIconOnly 
          isDisabled={grade.notas.length >= 6}
          onPress={() => {
            let copy = grade.notas;
            copy.push('');
            
            setGrade({ ...grade, notas: copy }); 
          }}
        >
          +
        </Button>
        <Button
          color="danger" 
          radius="full" 
          isIconOnly
          isDisabled={grade.notas.length <= 1}
          onPress={() => {
            let copy = grade.notas;
            copy.pop();
            
            setGrade({ ...grade, notas: copy }); 
          }}>
            -
        </Button>
      </div>
      <div className="flex justify-center mb-3">
        <Input
          size="md"
          key="conceito"
          variant="flat"
          className="w-35"
          classNames={{
            inputWrapper: [
              "bg-content1",
              "shadow-none"
            ],
          }}
          type="number"
          label="Conceito"
          color={state === "valid" ? "default" : "danger"}
          validationState={state}
          errorMessage={state === "invalid" && "Insira um número entre 0 e 2"}
          value={grade.conceito}
          placeholder="Insira seu conceito"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrade({ ...grade, conceito: e.target.value })}
        />
      </div>
      <div className="flex justify-center">
        <BimestralCard grade={grade} />
      </div>
    </>
  )
}