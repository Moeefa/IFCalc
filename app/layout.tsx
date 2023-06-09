import './globals.css'
import Header from '@/components/header.component';
import Footer from '@/components/footer.component';
import { Providers } from './providers';
import { Roboto } from 'next/font/google'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'IFCalc',
  description: 'O IFCalc foi criado no intuito de auxiliar os alunos a visualizarem suas notas e aprovações. Os alunos podem salvar, editar e excluir suas notas no banco de dados.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR" className={`dark ${roboto.className}`}>
      <body>
        <Providers>
          <Header/>
          <main>
            {children}
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  )
}
