'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, Tab } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import axios from 'axios';
import Subject from '@/components/subject.component';

export default function Home() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    axios.get("/api/grade", { signal: AbortSignal.timeout(15_000) })
      .then(res => setData(res.data));
  }, [status, session]);

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
      <Subject data={data} />
      {/*</Tab>
      </Tabs>*/}
    </>
  );
}
