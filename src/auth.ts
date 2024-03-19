import type {
  Account,
  NextAuthConfig,
  Profile,
  Session,
  User,
} from "next-auth";

import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

export const config = {
  secret: process.env.AUTH_SECRET,
  providers: [
    {
      clientId: process.env.AUTH_SUAP_ID,
      clientSecret: process.env.AUTH_SUAP_SECRET,
      id: "suap",
      name: "SUAP",
      type: "oauth",
      authorization: {
        url: "https://suap.ifmt.edu.br/o/authorize",
        params: { scope: "email identificacao" },
      },
      token: "https://suap.ifmt.edu.br/o/token/",
      userinfo: "https://suap.ifmt.edu.br/api/eu/",
      profile(profile) {
        return {
          id: profile.identificacao,
          ...profile,
        };
      },
    },
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
    updateAge: 2 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub as string;
        session.user.name = token.uid?.nome_social || token.uid?.nome_usual;
        session.user.image = token.uid?.foto;
        session.access_token = token.access_token;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      token.access_token ??= account?.access_token;
      token.uid ??= {
        id: user?.id,
        identificacao: user?.identificacao,
        nome_social: user?.nome_social,
        nome_usual: user?.nome_usual,
      };

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
