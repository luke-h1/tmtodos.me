import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
// import { NavBar } from "./NavBar";
import { ReactNode } from 'react';

interface LayoutProps {
  variant?: WrapperVariant;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      {/* <NavBar /> */}
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
