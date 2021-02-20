import React, { FunctionComponent } from 'react';
import { NavIcon } from '../../Icons/Logo';
import Link from 'next/link';
import { SignUpButton, SignInButton } from '../Button';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  Icon,
  // NavBtnLink,
} from './NavStyles';

interface Iprops {
  toggle: () => void;
}

const NavBar: FunctionComponent<Iprops> = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo href="/">
            <a>
              <NavIcon />
            </a>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <Icon />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks href="/">
                <a>Home</a>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/about">
                <a>About</a>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/register">
                <a>Register</a>
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <SignInButton>
              <Link href="/login">
                <a>Login </a>
              </Link>
            </SignInButton>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};
export default NavBar;
