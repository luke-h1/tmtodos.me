import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Reset } from '../styles/reset';
import { Spinner } from '../components/Spinner';
import { setAccessToken } from '../utils/accessToken';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }
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
