'use client';

import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FinalGrade as GradeCard } from '@/components/cards.component';

export default async function Home() {
  const [grade, setGrade] = useState({ 
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  });
  const [value, setValue] = useState("");
  
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="lg:flex">
            {[...Array(4)].map((_, i) => (
              <Input 
                id={`${i+1}`}
                size="sm" 
                className="m-4 w-35" 
                type="number" 
                label={`${i+1}° bimestre`}
                value={"0"}
                onValueChange={setValue}
              />
            ))}
          </div>
          <GradeCard/>
        </div>
      </div>
    </>
  );
}
