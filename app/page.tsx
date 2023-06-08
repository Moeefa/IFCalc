'use client';

import { Input } from '@nextui-org/react';

export default async function Home() {
  return (
    <>
      <div className="flex flex-col justify-center">
        {[...Array(4)].map((_, i) => (
          <Input className="basis-44" type="number" label={`${i+1}° bimestre`}/>
        ))}
      </div>
    </>
  );
}
