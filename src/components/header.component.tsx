'use client';

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Skeleton } from '@nextui-org/react';
import {
  LoginButton,
  LogoutButton,
} from '@/src/components/buttons.component';

import Image from 'next/image';
import brand from '@/public/icon.svg';
import { useSession } from 'next-auth/react';
import { useTabContext } from '@/src/context/tab';

export default function Header() {
  const { tab, setTab } = useTabContext();
  const { status } = useSession();

  return (
    <>
      <Navbar isBordered position="sticky" className="mb-2">
        <NavbarBrand>
          <Image src={brand} width={50} priority alt="Brand Icon" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color={tab == 'final' ? 'primary' : 'foreground'} className="cursor-pointer" onClick={() => setTab('final')}>
              Média final
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color={tab == 'bimestral' ? 'primary' : 'foreground'} className="cursor-pointer" onClick={() => setTab('bimestral')}>
              Média bimestral
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {status === "authenticated" ? <LogoutButton /> : <Skeleton isLoaded={status !== "loading"} className="rounded-full"><LoginButton /></Skeleton>}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

