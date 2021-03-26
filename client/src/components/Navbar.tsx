import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAccessToken } from '../utils/accessToken';
import { CustomLink } from './CustomLink';
import { CustomText } from './CustomText';
import { Spinner } from './Spinner';

export const Navbar: React.FC<{}> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const LogoutUser = async () => {
    await logout();
    setAccessToken('');
    await client!.resetStore();
  };

  let body: any = null;
  if (loading) {
    body = <Spinner />
  } else if (data && data.me) {
    body = (
      <>
        <CustomText>{data.me.email}</CustomText>
        ;
      </>
    );
  } else {
    body = (
      <>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/register">Register</CustomLink>
      </>
    );
  }
  return (
    <>
      <div className=" bg-black py-4 px-0 sticky flex flex-col align-center text-right">
        <div className="ml-auto flex flex-row">
          <p className="mr-2 ml-2">{body}</p>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/notes">Notes</CustomLink>
          {!loading && data && data.me ? (
            <CustomText onClick={LogoutUser}>
              Logout
            </CustomText>
          ) : null}
        </div>
      </div>
    </>
  );
};
