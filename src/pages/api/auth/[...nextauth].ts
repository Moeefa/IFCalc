import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    {
      id: "suap",
      name: "SUAP",
      type: "oauth",
      authorization: `https://suap.ifmt.edu.br/o/authorize/?response_type=token&grant_type=implicit&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=identificacao%20email&redirect_uri=https://${process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "ifcalc.vercel.app" : "ifcalc-git-preview-moeefa.vercel.app"}`,
      token: "https://suap.ifmt.edu.br/o/token/",
      userinfo: "https://suap.ifmt.edu.br/api/eu",
      profile(profile) {
        return {
          id: profile.identificacao
        }
      },
    },
  ],
}

export default NextAuth(authOptions)