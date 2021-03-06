import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </>
    </>
  );
}

export default MyApp;
