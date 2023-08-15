'use client';

import { BimTab as Bimestral, FinalTab as Final } from '@/src/components/tabs.component';
import { Divider, Skeleton, Tab, Tabs } from '@nextui-org/react';
import { Type } from '@/types/index.d';

import Subject from '@/src/components/subject.component';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useTabContext } from '@/src/context/tab';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { status } = useSession();
  const { data, error, isLoading } = useSWR(() => status === "authenticated" ? "/api/grade" : null, fetcher);
  const { active, setActive } = useTabContext();

  switch (active) {
    case Type.BIMESTRAL:
      return (
        <Bimestral />
      );
    case Type.FINAL:
      return (
        <>
          <Final />
          {status === "authenticated"
            ? <>
                <Divider className="my-5" />
                {isLoading
                  ? <div className="flex justify-center"><Skeleton className="rounded-medium w-11/12 sm:w-96 h-20 px-4" /></div>
                  : <Subject data={data} />}
              </>
            : <></>}
        </>
      );
  }
}
