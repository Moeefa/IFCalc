import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

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
  verification: {
    google: "fwUIRvaOjpP73e7CxtTz7PdWYqo7Suw_ir1I-GWDUew",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#60a5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#1d4ed8" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 relative container mt-20 mb-4 space-y-4">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
