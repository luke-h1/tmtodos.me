/* eslint-disable import/no-extraneous-dependencies */
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import NavBar from '../components/NavBar/NavBar';
import { ChakraProvider } from '@chakra-ui/react';

const Container = styled.div`
  margin: 10px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
