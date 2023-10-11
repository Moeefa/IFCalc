import './globals.css';

import Footer from '@/src/components/footer.component';
import Head from 'next/head';
import Header from '@/src/components/header.component';
import { Providers } from './providers';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'IFCalc',
  description: 'O IFCalc foi criado no intuito de auxiliar os alunos a visualizarem suas notas e aprovações. Os alunos podem salvar, editar e excluir suas notas no banco de dados.',
  icons: '/icon.svg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="pt-BR" className={roboto.className}>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-1685879549843656"></meta>
      </Head>
      <body>
        <Providers>
          <Header />
          <main className="my-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
