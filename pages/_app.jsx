import '../shared/styles/global.css';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>IFCalc</title>
        <meta content="IFCalc" property="og:title" />
        <meta content="Com o nosso site, você poderá calcular a sua média anual e bimestral!" name="description"/>
        <meta content="Com o nosso site, você poderá calcular a sua média anual e bimestral!" property="og:description" />
        <meta content={process.env.NEXT_PUBLIC_URL} property="og:url" />
        <meta content="#000000" data-react-helmet="true" name="theme-color" />
      </Head>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Component {...pageProps}/>
        <Analytics/>
      </MantineProvider>
    </>
  );
};