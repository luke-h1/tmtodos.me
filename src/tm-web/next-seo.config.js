const title = 'tmtodos.me – Simple todo app ';
const description = 'Simple todo app made with Next & PostgreSQL';

const SEO = {
  title,
  description,
  canonical: 'https://tmtodos.me',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://tmtodos.me',
    title,
    description,
  },
  twitter: {
    handle: '@lukeH_1999',
    site: '@lukeH_1999',
    cardType: 'summary_large_image',
  },
  images: [
    {
      url: 'https://tmtodos.me/logo192.png',
      alt: title,
    },
  ],
};

export default SEO;
