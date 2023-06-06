import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'IFCalc',
  description: 'O IFCalc foi criado no intuito de auxiliar os alunos a visualizarem suas notas e aprovações. Os alunos podem salvar, editar e excluir suas notas no banco de dados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
