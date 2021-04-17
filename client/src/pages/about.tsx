import { CustomHead } from 'components/CustomHead';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/about.module.scss';

const about = () => {
  return (
    <>
      <CustomHead title="About | tmtodos.me" description="About" />
      <NextSeo
        title="About"
        canonical="https://tmtodos.me/about"
        openGraph={{
          url: 'https://tmtodos.me/about',
          title: 'About',
        }}
      />
      <div className={styles.flex}>
        <h1 className="text-4xl">About tmtodos.me</h1>
        <div className="py-2 text-center">Full stack todo app that uses:</div>
        <div className="flex flex-col align-left items-left text-left">
          <ul className="list-disc">
            <li>React</li>
            <li>Next</li>
            <li>Tailwind</li>
            <li>Typescript</li>
            <li>Graphql</li>
            <li>Graphql codegen</li>
            <li>TypeORM</li>
            <li>PostgresQL</li>
            <li>Redis</li>
            <li>DataLoader</li>
            <li>Vercel</li>
            <li>Digital Ocean</li>
            <li>Dokku</li>
          </ul>
        </div>
        <div className="flex  mt-10 align-right text-right">
          {' '}
          <Link href="/">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
              type="button"
            >
              Home
            </button>
          </Link>
          <Link href="/create-todo">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
              type="button"
            >
              Create a todo
            </button>
          </Link>
          <a
            href="https://github.com/luke-h1/tmtodos.me"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Source code
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default about;
