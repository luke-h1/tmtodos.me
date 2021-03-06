import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import AuthState from 'context/auth/AuthState';
import NoteState from 'context/note/NoteState';
import UserState from 'context/user/UserState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthState>
        <NoteState>
          <UserState>
            <ChakraProvider>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </ChakraProvider>
          </UserState>
        </NoteState>
      </AuthState>
    </>
  );
}

export default MyApp;
