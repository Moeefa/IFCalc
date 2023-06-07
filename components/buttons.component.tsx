'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button onClick={() => signIn("suap")}>
      Entrar com SUAP
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()}>
      Sair
    </button>
  );
};
