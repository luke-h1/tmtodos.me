import React, { FunctionComponent } from 'react';
import { NavIcon } from '../icons/NavIcon';
import { Button } from './Button';

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
  StyledA,
  // NavBtnLink,
} from './NavStyles';

interface Iprops {
  toggle: any;
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
              <NavLinks href="/signin">
                <StyledA>Sign In</StyledA>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/signup">
                <StyledA>Sign Up</StyledA>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/about">
                <StyledA>About</StyledA>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks href="/pricing">
                <StyledA>Pricing</StyledA>
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <Button>
              Sign In
            </Button>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};
export default NavBar;
