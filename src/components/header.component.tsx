'use client';

import { 
  Link, 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenu, 
  NavbarMenuItem, 
  NavbarMenuToggle, 
  Skeleton } from '@nextui-org/react';
import {
  LoginButton,
  LogoutButton,
} from '@/src/components/buttons.component';

import { useState } from 'react';
import Image from 'next/image';
import brand from '@/public/icon.svg';
import { useSession } from 'next-auth/react';
import { useTabContext } from '@/src/context/tab';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { tab, setTab } = useTabContext();
  const { status } = useSession();

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered position="sticky" className="mb-2">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={brand} width={50} priority alt="Ícone IFCalc" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" isDisabled={tab === 'final'} className="cursor-pointer" onClick={() => setTab('final')}>
              Média final
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" isDisabled={tab === 'bimestral'} className="cursor-pointer" onClick={() => setTab('bimestral')}>
              Média bimestral
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {status === "authenticated" ? <LogoutButton /> : <Skeleton isLoaded={status !== "loading"} className="rounded-full"><LoginButton /></Skeleton>}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link color="foreground" isDisabled={tab === 'final'} className="cursor-pointer" onClick={() => setTab('final')}>
              Média final
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link color="foreground" isDisabled={tab === 'bimestral'} className="cursor-pointer" onClick={() => setTab('bimestral')}>
              Média bimestral
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}

