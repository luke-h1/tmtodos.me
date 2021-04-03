import type { AppProps } from 'next/app';
import { Reset } from '../styles/reset';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {Reset}
      <div className="flex flex-col align-center items-center max-w-800 w-full">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
