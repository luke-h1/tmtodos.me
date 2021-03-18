import React from "react";
import { useMeQuery } from "../generated/graphql";
import { CustomLink } from "./CustomLink";
import { CustomText } from "./CustomText";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <CustomText>{data.me.email}</CustomText>;
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
          <CustomText>Logout</CustomText>
        </div>
      </div>
    </>
  );
};
