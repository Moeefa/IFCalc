'use client';

import { useSession } from 'next-auth/react';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import SubjectCard from '@/components/subject.component';
import useSWR from 'swr';
 
export default function Home() {
  const fetcher = (url: string, token: string) => fetch(url, { 
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    })
    .then(r => r.json());
  
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(status === "authenticated" ? [`https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${new Date().getFullYear()}/1/`, session.accessToken] : null, fetcher);
  
  return (
    <>
      <Tabs fullWidth variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalTab/>
          {error && <p>{error}</p>}
          {!isLoading &&
            <>
              <Divider/>
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
