import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
// import { NavBar } from "./NavBar";
import { ReactNode } from 'react';
import Nav from './Nav';

interface LayoutProps {
  variant?: WrapperVariant;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Nav />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
