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
  
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="lg:flex">
            {[...Array(4)].map((_, i) => (
              <Input 
                id={`${i+1}_bim`}
                size="sm" 
                className="m-4 w-35" 
                type="number"
                max="10"
                min="0"
                label={`${i+1}° bimestre`}
                value={grade[(`${i+1}`) as keyof typeof grade] as unknown as string}
                placeholder="Insira sua nota"
                onChange={(event) => setGrade({ ...grade, [`${i+1}`]: event.target.value as unknown as number })}
              />
            ))}
          </div>
          <GradeCard grade={grade}/>
        </div>
      </div>
    </>
  );
}
