import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Contributor } from "../types/utils";
import type { Provider } from "next-auth/providers";

/*
 * Contributors that helped adding more auth providers.
 */
export const contributors: Contributor[] = [
	{
		name: "Gabriel Mendes",
		origin: "Rio Grande do Norte",
		image: "ifrn_gabriel.jpg",
		redirect_url: "https://www.linkedin.com/in/gabriel-mendes-bb5571264/",
		socials: [
			{
				name: "Instagram",
				url: "https://www.instagram.com/gabrielmenndess/",
			},
			{
				name: "LinkedIn",
				url: "https://www.linkedin.com/in/gabriel-mendes-bb5571264/",
			},
			{
				name: "GitHub",
				url: "https://github.com/GabrielMendessDev",
			},
		],
	},
];

const providers: Provider[] = [
	{
		id: "suap_ifmt",
		name: "Mato Grosso",
		type: "oauth",
		token: "https://suap.ifmt.edu.br/o/token/",
		userinfo: "https://suap.ifmt.edu.br/api/rh/eu/",
		authorization: {
			url: "https://suap.ifmt.edu.br/o/authorize",
			params: { scope: "email identificacao" },
		},
		profile(profile) {
			return {
				id: profile.identificacao,
				...profile,
			};
		},
	},
	{
		id: "suap_ifrn",
		name: "Rio Grande do Norte",
		type: "oauth",
		token: "https://suap.ifrn.edu.br/o/token/",
		userinfo: "https://suap.ifrn.edu.br/api/rh/eu/",
		authorization: {
			url: "https://suap.ifrn.edu.br/o/authorize",
			params: { scope: "email identificacao" },
		},
		profile(profile) {
			return {
				id: profile.identificacao,
				...profile,
			};
		},
	},
];

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	}

	return { id: provider.id, name: provider.name };
});

export const config = {
	providers,
	pages: {
		signIn: "/auth",
	},
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
				session.provider = token.provider as string;
				session.access_token = token.access_token as string;
			}

			return session;
		},
		async jwt({ token, user, account }) {
			if (account) {
				token.provider ??= account?.provider.replace("suap_", "");
				token.access_token ??= account?.access_token;
			}

			token.uid ??= user;

			return token;
		},
	},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
