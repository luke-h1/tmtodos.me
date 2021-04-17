import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { CustomLink } from './CustomLink';
import { Spinner } from './Spinner';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
    // user is not logged in
  } else if (!data?.me) {
    body = (
      <div className="sm:flex sm:items-center">
        <CustomLink href="/login">
          <a className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
            Sign in
          </a>
        </CustomLink>
        <CustomLink href="/register">
          <a className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 cursor-pointer">
            Sign up
          </a>
        </CustomLink>
      </div>
    );
    // user is logged in
  } else {
    body = (
      <div className="sm:flex sm:items-center">
        <CustomLink href="/">
          <a className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-7">
            {data.me.email}
          </a>
        </CustomLink>
        <div className="mr-4 ml-2 flex">
          <CustomLink href="/create-todo">
            <a className="text-gray-800 text-sm font-semibold hover:text-purple-600">
              Create todo
            </a>
          </CustomLink>
        </div>
        {logoutFetching ? <Spinner /> : (
          <button
            onClick={async () => {
              await logout();
              router.reload();
            }}
            className="text-gray-800 text-sm font-semibold hover:text-purple-600"
            disabled={logoutFetching}
            type="button"
          >
            Logout
          </button>
        )}
      </div>
    );
  }
  return (
    <>
      <div className="bg-gray-100 w-full mb-10 m-0">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-5 align-center">
              <div className="sm:flex sm:items-center">
                <CustomLink href="/">
                  <a className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
                    Home
                  </a>
                </CustomLink>
              </div>
              {body}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
