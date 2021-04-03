import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAccessToken } from '../utils/accessToken';
import { isServer } from '../utils/isServer';
import { CustomLink } from './CustomLink';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  const logoutUser = async () => {
    await logout();
    setAccessToken('');
    // await client!.resetStore();
    router.reload();
  };

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
        <a className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 cursor-pointer">
          Sign up
        </a>
      </div>
    );
    // user is logged in
  } else {
    body = (
      <div className="sm:flex sm:items-center">
        <CustomLink href="/create-note">
          <a className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
            Create Note
          </a>
        </CustomLink>
        <button
          onClick={async () => {
            await logoutUser();
          }}
          className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
          disabled={logoutFetching}
          type="button"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
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
