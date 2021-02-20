/* eslint-disable import/no-extraneous-dependencies */
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
