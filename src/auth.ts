import type { Account, Profile, Session, User } from "next-auth";

import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      clientId: process.env.AUTH_SUAP_ID,
      clientSecret: process.env.AUTH_SUAP_SECRET,
      id: "suap",
      name: "SUAP",
      type: "oidc",
      issuer: "https://suap.ifmt.edu.br/o/.well-known/openid-configuration/",
      authorization: {
        url: "https://suap.ifmt.edu.br/o/authorize",
        params: { scope: "openid email identificacao" },
      },
    },
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
    updateAge: 2 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.sub;
        session.user.name = token.uid?.nome_social || token.uid?.nome_usual;
        session.user.image = token.uid?.foto;
        session.access_token = token.access_token as string;
      }

      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }) {
      token.access_token = account?.access_token as string;
      token.uid ??= {
        identificacao: user.identificacao,
        nome_social: user.nome_social,
        nome_usual: user.nome_usual,
      };

      return token;
    },
  },
});
