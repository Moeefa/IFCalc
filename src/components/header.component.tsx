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
import { Type } from '@/types/index.d';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { active, setActive } = useTabContext();
  const { status } = useSession();

  const items = [{
    label: "Média final",
    value: Type.FINAL,
  },
  {
    label: "Média bimestral",
    value: Type.BIMESTRAL,
  }];

  return (
    <>
      <Navbar 
        onMenuOpenChange={setIsMenuOpen} 
        isBordered 
        position="sticky" 
        className="mb-2"
        classNames={{
          menuItem: [
            "cursor-pointer",
          ],
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "cursor-pointer",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={brand} width={50} priority alt="Ícone IFCalc" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {items.map(item => (
            <NavbarItem isActive={active === item.value}>
              <Link onClick={() => setActive(item.value)} color="foreground">{item.label}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {status === "authenticated" 
              ? <LogoutButton /> 
              : <Skeleton isLoaded={status !== "loading"} className="rounded-full"><LoginButton /></Skeleton>}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {items.map(item => (
            <NavbarMenuItem>
              <Link onClick={() => setActive(item.value)} isDisabled={active === item.value} color="foreground">{item.label}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}

