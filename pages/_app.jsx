import '../static/css/globals.css'
import { useState, useEffect } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Component {...pageProps} />
        </MantineProvider>
    </ColorSchemeProvider>
  );
};