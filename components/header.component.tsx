'use client';

import { useSession } from 'next-auth/react';
import { Navbar } from '@nextui-org/react';
import { 
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default function Header() {
  const { data: session, status } = useSession();
  
  return (
    <>
      <Navbar>
        <Navbar.Content>
          <Navbar.Item>
            {status === "authenticated" ? <LogoutButton/> : <LoginButton/>}
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}

