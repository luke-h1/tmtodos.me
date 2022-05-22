// create a react page which has a link to login and a link to register pages

import { Button, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Wrapper } from '../components/Wrapper';

const ForbiddenPage = () => {
  return (
    <Wrapper>
      <Text as="h1" fontSize="32px">
        Forbidden
      </Text>
      <Text as="p" fontSize="24px">
        You are not authorized to view this page. Either login or create an
        account:
      </Text>
      <Stack>
        <Button colorScheme="blue">
          <Link to="/login">Login</Link>
        </Button>
      </Stack>
      <Stack>
        <Button colorScheme="green">
          <Link to="/register">Register</Link>
        </Button>
      </Stack>
    </Wrapper>
  );
};
export default ForbiddenPage;
