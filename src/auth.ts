import NextAuth, { type NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    {
      id: "suap",
      name: "SUAP - IFMT",
      type: "oauth",
      token: "https://suap.ifmt.edu.br/o/token/",
      userinfo: "https://suap.ifmt.edu.br/api/eu/",
      authorization: {
        url: "https://suap.ifmt.edu.br/o/authorize",
        params: { scope: "email identificacao" },
      },
      profile(profile) {
        return {
          id: profile.identificacstao,
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
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub as string;
        session.user.name = token.uid?.nome_social || token.uid?.nome_usual;
        session.user.image = token.uid?.foto;
        session.access_token = token.access_token as string;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      token.access_token ??= account?.access_token;
      token.uid ??= user;

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
