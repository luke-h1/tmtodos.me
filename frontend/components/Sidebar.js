/* eslint-disable max-len */
import { FiMenu } from 'react-icons/fi';
import {
  SidebarContainer,
  Icon,
  SidebarWrapper,
  SidebarMenu,
  SideBarLink,
} from './SidebarStyles';

const SideBar = ({ toggle, isOpen }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <FiMenu style={{ fill: '#000' }} />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SideBarLink onClick={toggle} href="/signin">
            <a>Sign In</a>
          </SideBarLink>
          <SideBarLink onClick={toggle} href="/signup">
            <a>Sign Up</a>
          </SideBarLink>

          <SideBarLink onClick={toggle} href="/about">
            <a>About</a>
          </SideBarLink>

          <SideBarLink onClick={toggle} href="/pricing">
            <a>Pricing</a>
          </SideBarLink>

        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
export default SideBar;
