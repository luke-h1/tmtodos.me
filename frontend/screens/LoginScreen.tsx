import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

import Loader from 'components/Loader';
import { Button } from 'components/Button';
import Error from '../components/Error';
import { LoginSchema } from '../validations/userValidation';
import { login } from '../store/actions/userActions';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Flex direction="column" justify="center" align="center" minH={50} mb={10}>
        <Box>
          <Heading as="h1" fontSize="40px" mb={4}>
            Login
          </Heading>
        </Box>
      </Flex>
      {loading && <Loader />}
      {error && <Error>{error}</Error>}
      <Flex
        direction="column"
        justify="center"
        align="center"
        mx="auto"
        maxW="660px"
      >
        <form onSubmit={submitHandler}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              mb={8}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit">Login</Button>
        </form>
      </Flex>
    </>
  );
};
export default LoginScreen;
