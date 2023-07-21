'use client';

import { useSession } from 'next-auth/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import brand from '../public/icon.svg';
import {
  LoginButton,
  LogoutButton,
} from '@/components/buttons.component';

export default function Header() {
  const { status } = useSession();

  return (
    <>
      <Navbar isBordered position="sticky" className="mb-2">
        <NavbarBrand>
          <Image src={brand} width={50} priority alt="Brand Icon" />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            {status === "authenticated" ? <LogoutButton /> : <Skeleton isLoaded={status !== "loading"} className="rounded-full"><LoginButton /></Skeleton>}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

