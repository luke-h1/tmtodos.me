import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import UserContext from 'context/user/userContext';
import UserState from '../context/user/UserState';

function MyApp({ Component, pageProps }: AppProps) {
  const userContext = useContext(UserContext);
  const { authUser } = userContext;

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
