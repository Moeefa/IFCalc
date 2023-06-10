'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FinalGrade as GradeCard } from '@/components/cards.component';

export default function Home() {
  const [changed, setChanged] = useSate(false);
  const [grade, setGrade] = useState({ 
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { value, min, max } = event.target;
    const newValue = Math.max(Number(0), Math.min(Number(10), Number(value)));

    setChanged(true);
    setGrade({ ...grade, [`${i+1}`]: newValue });
  };

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
                value={grade[(`${i+1}`) as keyof typeof grade] === 0 && changed === false ? "" : grade[(`${i+1}`) as keyof typeof grade] as unknown as string}
                placeholder="Insira sua nota"
                onChange={(e) => handleChange(e, i)}
              />
            ))}
          </div>
          <GradeCard grade={grade}/>
        </div>
      </div>
    </>
  );
}
