import './globals.css'
import Header from '@/components/header.component';
import Footer from '@/components/footer.component';
import { Providers } from './providers';
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'IFCalc',
  description: 'O IFCalc foi criado no intuito de auxiliar os alunos a visualizarem suas notas e aprovações. Os alunos podem salvar, editar e excluir suas notas no banco de dados.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${roboto.className}`}>
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
