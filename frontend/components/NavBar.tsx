import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-xl">
            <Link href="/">
              <a>Take My Notes</a>
            </Link>
          </span>
        </div>

        <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="text-sm sm:flex-grow">
            <Link href="/about">
              <a
                className="block mt-4 sm:inline-block sm:mt-0 text-white hover:underline mr-4"
              >
                About TMN
              </a>

            </Link>
            <Link href="/login">
              <a
                className="block mt-4 sm:inline-block sm:mt-0 text-white hover:underline mr-4"
              >
                Login
              </a>
            </Link>
            <Link href="/register">
              <a
                className="block mt-4 sm:inline-block sm:mt-0 text-white hover:underline mr-4"
              >
                Register
              </a>

            </Link>
          </div>
          <div>
            <Link href="/login">
              <a
                className="block mt-4 sm:inline-block sm:mt-0 text-white hover:underline mr-4"
              >
                Login
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
