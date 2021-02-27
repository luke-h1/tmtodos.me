import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Center,
} from '@chakra-ui/react';

import Loader from 'components/Loader';
import { Button } from 'components/Button';
import { LoginSchema } from '../validations/userValidation';

const LoginScreen = () => (
  <>
    <Flex direction="column" justify="center" align="center" minH={50} mb={10}>
      <Box>
        <Heading as="h1" fontSize="40px" mb={4}>
          Login
        </Heading>
      </Box>
    </Flex>
    <Flex
      direction="column"
      justify="center"
      align="center"
      mx="auto"
      maxW="660px"
    >
      <form>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" mb={8} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </form>
      <Button>Login</Button>
    </Flex>
    <Center mt={10}>
      <Box p="8" w="500px" borderWidth="1px" rounded="lg" flexBasis="45%">
        <Heading as="h3" size="lg" mb="2">Not a user ? </Heading>
        <Text fontSize="lg">Register today !</Text>
        <Button><Link href='/register'><a>
          Signup
          </a></Link></Button>
      </Box>
    </Center>

  </>
);
export default LoginScreen;
