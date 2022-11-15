import '../shared/styles/global.css';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  /*const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));*/

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Head>
        <title>IFCalc</title>
        <meta content="IFCalc" property="og:title" />
        <meta content="Com o nosso site, você poderá calcular a sua média anual e bimestral!" property="og:description" />
        <meta content={process.env.NEXT_PUBLIC_URL} property="og:url" />
        <meta content="#000000" data-react-helmet="true" name="theme-color" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
};