/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
