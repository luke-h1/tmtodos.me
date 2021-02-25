import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Center,
  Stack,
} from '@chakra-ui/react';

import Loader from 'components/Loader';
import { Button } from 'components/Button';
import { LoginSchema } from '../validations/userValidation';

const RegisterScreen = () => (
  <>
    <Flex direction="column" justify="center" align="center" minH={50} mb={10}>
      <Box>
        <Heading as="h1" fontSize="40px" mb={4}>
          Register
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
        <FormControl id="firstName">
          <FormLabel>Name</FormLabel>
          <Input type="text" mb={8} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" mb={8} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </form>
      <Button>Register</Button>
    </Flex>
  </>
);
export default RegisterScreen;
