import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Tabs, Tab, Divider } from '@nextui-org/react';
import { FinalTab } from '@/components/tabs.component';
import SubjectCard from '@/components/subject.component';

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const data = await 
  
  return (
    <>
      <Tabs fullWidth variant="underlined" radius="full" aria-label="Médias">
        <Tab key="anual" title="Média anual">
          <FinalTab/>
          {!!session &&
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
