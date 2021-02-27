import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import UserContext from 'context/user/userContext';
import { useRouter } from 'next/router';

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
import Error from 'components/Error';

const LoginScreen = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    user,
    loading,
    login,
    error,
  } = userContext;

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (user && user.token !== null) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH={50}
        mb={10}
      >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit">Login</Button>
        </form>
      </Flex>
      <Center mt={10}>
        <Box p="8" w="500px" borderWidth="1px" rounded="lg" flexBasis="45%">
          <Heading as="h3" size="lg" mb="2">
            Not a user ?
            {' '}
          </Heading>
          <Text fontSize="lg">Register today !</Text>
          <Button>
            <Link href="/register">
              <a>Signup</a>
            </Link>
          </Button>
        </Box>
      </Center>
    </>
  );
};
export default LoginScreen;
