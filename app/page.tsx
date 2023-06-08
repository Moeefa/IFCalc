'use client';

import { Input } from '@nextui-org/react';

export default async function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div>
          {[...Array(4)].map((_, i) => (
            <Input className="m-4 w-20" type="number" label={`${i+1}° bimestre`}/>
          ))}
        </div>
      </div>
    </>
  );
}
