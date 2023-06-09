'use client';

import { Input } from '@nextui-org/react';
import { GradeYear } from '@/components/cards.component';

export default async function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="lg:flex">
          {[...Array(4)].map((_, i) => (
            <Input className="m-4 w-35" type="number" label={`${i+1}° bimestre`}/>
          ))}
        </div>
        <GradeYear/>
      </div>
    </>
  );
}
