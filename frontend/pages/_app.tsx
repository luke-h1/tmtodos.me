import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import UserState from '../context/user/UserState';
import store from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserState>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </UserState>
    </>
  );
}

export default MyApp;
