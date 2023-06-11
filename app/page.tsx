'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FinalGrade as GradeCard } from '@/components/cards.component';

function GradeInput({ i }: { i: number }) {
  const [value, setValue] = React.useState("");

  const validateGrade = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = React.useMemo(() => {
    if (value === "") return undefined;

    return validateEmail(value) ? "valid" : "invalid";
  }, [value]);

  return (
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
      onChange={(e) => handleChange(e, i)}
    />
  );
}

export default function Home() {
  const [grade, setGrade] = useState({ 
    "1": "",
    "2": "",
    "3": "",
    "4": "",
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { value, min, max } = event.target;
    const newValue = Math.max(Number(0), Math.min(Number(10), Number(value)));

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
                value={grade[(`${i+1}`) as keyof typeof grade] as unknown as string}
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
