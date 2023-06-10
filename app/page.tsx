'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FinalGrade as GradeCard } from '@/components/cards.component';

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  let { value, min, max } = event.target;
  value = Math.max(Number(min), Math.min(Number(max), Number(value)));

  setGrade({ ...grade, [`${i+1}`]: event.target.value as unknown as number });
};

export default function Home() {
  const [grade, setGrade] = useState({ 
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
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
                value={grade[(`${i+1}`) as keyof typeof grade] === 0 ? "" : grade[(`${i+1}`) as keyof typeof grade] as unknown as string}
                placeholder="Insira sua nota"
                onChange={handleChange}
              />
            ))}
          </div>
          <GradeCard grade={grade}/>
        </div>
      </div>
    </>
  );
}
