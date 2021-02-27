import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import Message from 'components/Message';
import Error from 'components/Error';
import { LoginSchema } from '../validations/userValidation';
import AuthContext from '../context/Auth/authContext';

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const authContext = useContext(AuthContext);

  const { isAuthenticated, register, error } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      console.log('user registered');
      register(name, email, password);
    }
  };

  return (
    <>
      <Flex direction="column" justify="center" align="center" minH={50} mb={10}>
        <Box>
          <Heading as="h1" fontSize="40px" mb={4}>
            Register
          </Heading>
        </Box>
      </Flex>
      {message && <Message>{message}</Message>}
      {error && <Error>{error}</Error>}
      <Flex
        direction="column"
        justify="center"
        align="center"
        mx="auto"
        maxW="660px"
      >
        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              mb={8}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              mb={8}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </FormControl>
          <Button type="submit">Register</Button>
        </form>

        {/* already have an account to go here */}
      </Flex>
    </>
  );
};
export default RegisterScreen;
