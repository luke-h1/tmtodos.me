import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import AuthState from 'context/auth/AuthState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthState>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </AuthState>
    </>
  );
}

export default MyApp;
