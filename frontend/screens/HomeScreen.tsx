import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import {
  Text,
  Flex,
} from '@chakra-ui/react';
import { Button } from 'components/Button';

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Flex direction="column" align="center">
        <Text fontSize="60px" mb={10}>
          Take My Notes
        </Text>
        {userInfo ? (
          <Text fontSize="30px">
            👋
            {' '}
            {' '}
            {userInfo.name}
          </Text>
        ) : (
          <Link href="/register"><Button>Sign Up</Button></Link>
        )}
      </Flex>
    </>
  );
};
export default HomeScreen;
