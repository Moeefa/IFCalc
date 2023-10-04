'use client';

import { BimTab as Bimestral, FinalTab as Final } from '@/src/components/tabs.component';
import { Divider, ScrollShadow, Skeleton, Tab, Tabs } from '@nextui-org/react';

import Subject from '@/src/components/subject.component';
import { Type } from '@/types/index.d';
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
          <div className="sm:flex sm:justify-center gap-10">
            <Final />
            <Divider className="my-4 sm:hidden" />
            <ScrollShadow hideScrollBar className="sm:w-auto sm:pb-[2em] sm:pr-[2em] sm:max-h-[30em]">
              {status === "authenticated"
                ? <>
                    {isLoading
                      ? <div className="flex justify-center"><Skeleton className="rounded-medium w-11/12 sm:w-96 h-20 px-4" /></div>
                      : <Subject data={data} />}
                  </>
                : <></>}
            </ScrollShadow>
          </div>
        </>
      );
  }
}
