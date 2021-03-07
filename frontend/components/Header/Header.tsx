import React, { useState, useContext } from 'react';
import Link from 'next/link';
import {
  Box, Flex, Text, Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AuthContext from 'context/auth/authContext';
import Logo from '../../Icons/Logo';
import { CloseIcon, MenuIcon } from '../../Icons/HeaderIcons';

interface MenuProps {
  children: string;
  isLast?: Boolean;
  href: string;
}

const MenuItems: React.FC<MenuProps> = (props) => {
  const {
    children, isLast, href, ...rest
  } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link href={href}><a>{children}</a></Link>
    </Text>
  );
};

const Header = () => {
  const authcontext = useContext(AuthContext);
  const {
    user, logout, isAuthenticated, isAdmin, name, token,
  } = authcontext;

  const router = useRouter();
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  const logoutHandler = () => {
    logout();
    router.push('/');
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
    >
      <Flex align="center">
        <Link href="/"><a><Logo /></a></Link>

      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          {user && token && user.token ? (
            <>
              <Text mr={30}>
                Welcome
                {' '}
                <strong>{user.name}</strong>
              </Text>
              <MenuItems href="/">Home</MenuItems>
              <MenuItems href="/notes">Notes</MenuItems>
              <MenuItems href="/about">About</MenuItems>
              <Button colorScheme="teal" size="md" onClick={logoutHandler}>
                Logout
              </Button>

            </>
          ) : (
            <>
              <MenuItems href="/">Home</MenuItems>
              <MenuItems href="/about">About</MenuItems>
              <MenuItems href="/register">Register</MenuItems>
              <Button colorScheme="teal" size="md">
                <Link href="/login">login</Link>
              </Button>
            </>
          )}

          {token && user.isAdmin && (
          <>
            <Button colorScheme="green" size="md" ml={20}>
              <Link href="/admin/userlist">Manage users</Link>
            </Button>

          </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
