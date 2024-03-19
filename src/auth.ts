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
  basePath: "/auth",
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    {
      clientId: process.env.AUTH_SUAP_ID,
      clientSecret: process.env.AUTH_SUAP_SECRET,
      id: "suap",
      name: "SUAP",
      type: "oauth",
      token: "https://suap.ifmt.edu.br/o/token/",
      userinfo: "https://suap.ifmt.edu.br/api/eu/",
      authorization: {
        url: "https://suap.ifmt.edu.br/o/authorize",
        params: { scope: "identificacao" },
      },
    },
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
    updateAge: 2 * 60 * 60,
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
