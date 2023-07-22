'use client';

import { BimTab, FinalTab } from '@/src/components/tabs.component';
import { Divider, Skeleton, Tab, Tabs } from '@nextui-org/react';

import Subject from '@/src/components/subject.component';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useTabContext } from '@/src/context/tab';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { status } = useSession();
  const { data, error, isLoading } = useSWR(() => status === "authenticated" ? "/api/grade" : null, fetcher);
  const { tab, setTab } = useTabContext();

  switch (tab) {
    case 'bimestral':
      return (
        <BimTab />
      );
    case 'final':
      return (
        <>
          <FinalTab />
          {status === "authenticated"
          ? <>
              <Divider className="my-5" />
              {isLoading || data == undefined
                ? <div className="flex justify-center"><Skeleton className="rounded-medium w-11/12 sm:w-96 h-20 px-4" /></div>
                : !!error
                  ? error.info
                  : <Subject data={data} />}
            </>
          : <></>}
        </>
      );
  }
}

export function CurrentTab() {
  
}