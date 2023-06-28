'use client';

import { useSession } from 'next-auth/react';
import { Tabs, Tab, Skeleton } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import Subject from '@/components/subject.component';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { status } = useSession();
  const { data, error, isLoading } = useSWR(() => status === "authenticated" ? "/api/grade" : null, fetcher);

  /*useEffect(() => {
    if (status !== "authenticated") return;

    axios.get("/api/grade", { signal: AbortSignal.timeout(15_000) })
      .then(res => setData(res.data));
  }, [status, session]);*/

  return (
    <>
      {/*<Tabs
        variant="underlined"
        aria-label="Médias"
        shadowCursor="md"
        fullWidth
      >
        <Tab title="Média anual">*/}
      <FinalTab />
      {isLoading
        ? <Skeleton>
        </Skeleton>
        : !!error
          ? error.info
          : data != undefined
            ? <Subject data={data} />
            : <></>
      }
      {/*</Tab>
      </Tabs>*/}
    </>
  );
}
