import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import { Provider } from 'react-redux';
import store from '../store/store';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
          <Footer /> 
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
