'use client';

import { useSession } from 'next-auth/react';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import SubjectCard from '@/components/subject.component';
import useSWR from 'swr';
 
export default function Home() {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(status === "authenticated" ? [`https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${new Date().getFullYear()}/1/`, session.accessToken] : null, (url: string, token: string) => fetch(url, { headers: { Authorization: "Bearer " + token } }))
  
  return (
    <>
      <Tabs fullWidth variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalTab/>
          {!isLoading &&
            <>
              <Divider/>
              {session}
            </>}
        </Tab>

        <Tab key="bim" title="Média bimestral">
        </Tab>
      </Tabs>
    </>
  );
}
