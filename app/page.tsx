'use client';

import React, { useState } from 'react';
import { Input, Tabs, Tab } from '@nextui-org/react';
import { FinalGrade as GradeCard } from '@/components/cards.component';

function FinalGradeTab() {
  const [grade, setGrade] = useState({ 
    "1": "",
    "2": "",
    "3": "",
    "4": "",
  });
  
  return (
    <>
      <div className="flex justify-center">
        <div className="lg:flex">
          {[...Array(4)].map((_, i) => {
            const value = grade[(`${i+1}`) as keyof typeof grade];
            const state = Number(value) >= 0 && Number(value) <= 10 ? "valid" : "invalid";
      
            return (
              <Input 
                key={`${i+1}_bim`}
                size="sm" 
                className="m-4 w-35" 
                type="number"
                label={`${i+1}° bimestre`}
                color={state === "valid" ? "default" : "danger"}
                validationState={state}
                errorMessage={state === "invalid" && "Insira um número entre 0 e 10"}
                value={value as unknown as string}
                placeholder="Insira sua nota"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGrade({ ...grade, [`${i+1}`]: event.target.value })}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <GradeCard grade={grade}/>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Tabs variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalGradeTab>
        </Tab>

        <Tab key="bim" title="Média bimestral">
        </Tab>
      </Tabs>
    </>
  );
}
          
