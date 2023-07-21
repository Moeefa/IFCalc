'use client';

import { useSession } from 'next-auth/react';
import { Tabs, Tab, Skeleton, Divider } from '@nextui-org/react';
import { FinalTab, BimTab } from '@/components/tabs.component';
import Subject from '@/components/subject.component';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { status } = useSession();
  const { data, error, isLoading } = useSWR(() => status === "authenticated" ? "/api/grade" : null, fetcher);

  return (
    <>
      <Tabs
        variant="underlined"
        aria-label="Médias"
        fullWidth
      >
        <Tab title="Média anual">
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
            : <></>
          }
        </Tab>

        <Tab title="Média bimestral">
          <BimTab />
        </Tab>
      </Tabs>
    </>
  );
}
