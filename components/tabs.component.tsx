'use client';

import React, { useState } from 'react';
import { FinalGrade as GradeCard } from '@/components/cards.component';
import { Input } from '@nextui-org/react';

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
                size="sm"
                className="w-35"
                classNames={{
                  inputWrapper: [
                    "bg-content1",
                    "shadow-none"
                  ],
                }}
                type="number"
                label={`${i + 1}° bimestre`}
                color={state === "valid" ? "default" : "danger"}
                validationState={state}
                errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                value={value as unknown as string}
                placeholder="Insira sua nota"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGrade({ ...grade, [`${i + 1}`]: event.target.value })}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <GradeCard grade={grade} />
      </div>
    </>
  );
}

export function BimTab() {
  return (
    <>
    </>
  )
}
