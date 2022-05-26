import React from 'react';
import {
  Box,
  Link as ChakraLink,
  Flex,
  Button,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Nav = () => {
  const { state, logout } = useAuthContext();

  let body = null;

  // user not logged in
  if (!state.user) {
    body = (
      <>
        <Link to="/login">
          <ChakraLink mr={2}>login</ChakraLink>
        </Link>
        <Link to="/register">
          <ChakraLink>register</ChakraLink>
        </Link>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>{state.user?.email}</Box>
        <Button onClick={() => logout()} variant="link">
          Logout
        </Button>
        <Box ml={5}>
          <Link to="/todo/create">
            <ChakraLink mr={2}>Create Todo</ChakraLink>
          </Link>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="#fff" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Link to="/">
          <ChakraLink>
            <Heading>Home</Heading>
          </ChakraLink>
        </Link>
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  );
};
export default Nav;
