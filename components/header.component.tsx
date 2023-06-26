'use client';

import { useSession } from 'next-auth/react';
import { Navbar, NavbarContent, NavbarItem, Skeleton } from '@nextui-org/react';
import {
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <>
      <Navbar position="sticky">
        <NavbarContent justify="end">
          <NavbarItem>
            {status === "authenticated" ? <LogoutButton /> : <Skeleton isLoaded={status !== "loading"} className="rounded-full"><LoginButton /></Skeleton>}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

