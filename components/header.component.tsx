'use client';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Navbar } from '@nextui-org/react';

export default async function Header({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <>      
      <Navbar>
        {children}
      </Navbar>
    </>
  );
}
