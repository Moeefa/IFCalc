import type { AppProps } from 'next/app';
import '../utils/styles/global.css';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IFCalc</title>
        <meta content="IFCalc" property="og:title" />
        <meta content="O IFCalc foi feito no intuito de auxiliar os alunos a visualizarem suas notas e aprovações. Os alunos podem salvar, editar e excluir suas notas no banco de dados." name="description"/>
        <meta content="O IFCalc foi feito no intuito de auxiliar os alunos a visualizarem suas notas e aprovações. Os alunos podem salvar, editar e excluir suas notas no banco de dados." property="og:description" />
        <meta content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`} property="og:url" />
        <meta content="#2d89ef" data-react-helmet="true" name="theme-color" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
      </Head>
      <MantineProvider
        withGlobalStyles 
        withNormalizeCSS
        theme={{ 
          colorScheme: 'dark',
          defaultRadius: 'sm',
          radius: {
            sm: 14,
          },
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
          fontFamilyMonospace: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
          colors: {
            dark: [
              '#ecedee',
              '#acaebf',
              '#8c8fa3',
              '#5c5f66',
              'RGBA(255, 255, 255, 0.15)',
              '#16181a',
              '#16181a',
              '#000000', // default: #1d1e30
              '#0c0d21',
              '#01010a',
            ],
          }
        }}
      >
        <Component {...pageProps}/>
        <Analytics/>
      </MantineProvider>
    </>
  );
};