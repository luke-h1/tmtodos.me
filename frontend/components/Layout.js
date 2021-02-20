import { useState } from 'react';
import { Reset } from '../styles/Reset';
import Sidebar from './SideBar';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {Reset}
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <NavBar isOpen={isOpen} toggle={toggle} />
      {children}
    </>
  );
};
export default Layout;
