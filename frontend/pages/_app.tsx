import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import AuthState from '../context/Auth/AuthState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthState>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthState>
    </>
  );
}

export default MyApp;
