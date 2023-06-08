'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@nextui-org/react';

export const LoginButton = () => {
  return (
    <Button variant="shadow" color="primary" size="xs" onPress={() => signIn("suap")} radius="full">
      Entrar com SUAP
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="shadow" color="warning" size="xs" onPress={() => signOut()} radius="full" className="bg-gradient-to-tr from-yellow-500 to-red-200 text-white shadow-lg">
      Encerrar sessão 
    </Button>
  );
};
