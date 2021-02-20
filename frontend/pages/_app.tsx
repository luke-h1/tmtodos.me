/* eslint-disable import/no-extraneous-dependencies */
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
