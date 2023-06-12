'use client';

import { useSession } from 'next-auth/react';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import SubjectCard from '@/components/subject.component';
import axios from 'axios';
import useSWR from 'swr';
 
export default function Home() {
  const fetcher = (url: string, token: string) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);
  
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(
    status === "authenticated" && !!session.accessToken
      ? [`https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/2023/1/`, session.accessToken] 
      : null, 
    fetcher
  );

  return (
    <>
      <Tabs fullWidth variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalTab/>
          {error && <p>{error?.message}</p>}
          {!isLoading &&
            <>
              <Divider/>
              <p>{`${session?.accessToken}`}</p>
              <pre>{JSON.stringify(session)}</pre>
              <pre>{JSON.stringify(data)}</pre>
            </>}
        </Tab>

        <Tab key="bim" title="Média bimestral">
        </Tab>
      </Tabs>
    </>
  );
}
