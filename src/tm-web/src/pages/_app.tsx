import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | tmtodos.me"
        description="Simple fullstack todo app"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://tmtodos.me',
          description: 'Simple fullstack todo app',
          site_name: 'take my todos',
          images: [
            {
              url: 'https://tmtodos.me/logo192.png',
              alt: 'Site Logo',
            },
          ],
        }}
        twitter={{
          handle: '@LukeH_1999',
          site: '@LukeH_1999',
          cardType: 'summary_large_image',
        }}
      />
      <div className="flex flex-col align-center items-center max-w-800 w-full">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
