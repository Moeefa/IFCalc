'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@nextui-org/react';

export const LoginButton = () => {
  return (
    <Button variant="flat" size="sm" onPress={() => signIn("suap")} radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      Entrar com SUAP
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="flat" size="sm" onPress={() => signOut()} radius="full" className="bg-gradient-to-tr from-yellow-500 to-red-200 text-white shadow-lg">
      Encerrar sessão 
    </Button>
  );
};
