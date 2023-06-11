'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FinalGrade as GradeCard } from '@/components/cards.component';

export default function Home() {
  const [grade, setGrade] = useState({ 
    "1": "",
    "2": "",
    "3": "",
    "4": "",
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    // const newValue = Math.max(0, Math.min(10, Number(event.target.value)));

    setGrade({ ...grade, [`${i+1}`]: event.target.value });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="lg:flex">
            {[...Array(4)].map((_, i) => {
              const value = grade[(`${i+1}`) as keyof typeof grade];
              const state = Number(value) >= 0 && Number(value) <= 10 ? "valid" : "invalid";
      
              return (
                <Input 
                  id={`${i+1}_bim`}
                  size="sm" 
                  className="m-4 w-35" 
                  type="number"
                  max="10"
                  min="0"
                  label={`${i+1}° bimestre`}
                  color={state === "valid" ? "default" : "warning"}
                  validationState={state}
                  errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                  value={value as unknown as string}
                  placeholder="Insira sua nota"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, i)}
                />
              );
            })}
          </div>
          <GradeCard grade={grade}/>
        </div>
      </div>
    </>
  );
}
