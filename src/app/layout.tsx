import "./globals.css";

import type { Metadata, Viewport } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "IFCalc",
	description:
		"O IFCalc foi criado no intuito de auxiliar os alunos a visualizarem suas notas e aprovações.",
	icons: "/icon.svg",
	creator: "Luiz Henrique da Silva Xinaider",
	authors: [
		{
			name: "Luiz Henrique da Silva Xinaider",
			url: "https://github.com/Moeefa",
		},
	],
	keywords: [
		"IFCalc",
		"IFMT",
		"Instituto Federal",
		"Notas",
		"Média",
		"Aprovação",
		"Reprovação",
		"Cálculo",
		"Cálculo de média",
		"Cálculo de aprovação",
		"Cálculo de reprovação",
	],
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className="font-openrunde">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
