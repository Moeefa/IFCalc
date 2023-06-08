'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@nextui-org/react';

export const LoginButton = () => {
  return (
    <Button variant="shadow" color="primary" size="sm" onPress={() => signIn("suap")} radius="full">
      Entrar com SUAP
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button variant="shadow" color="warning" size="sm" onPress={() => signOut()} radius="full">
      Encerrar sessão 
    </Button>
  );
};
