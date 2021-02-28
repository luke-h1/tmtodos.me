import React from 'react';
import {
  Flex, Box, Center, Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  return (
    <Center>
      <Flex direction="column" justify="center" align="center">
        <Text as="h1" fontSize="40px">
          Hello
          👋
          {' '}
          {userInfo.name}
        </Text>
        <Box mt={10}>
          <Text as="h1" fontSize="20px">
            {userInfo.name}
            's recent notes:
          </Text>
          <Text as="h1" fontSize="25px">TODO: map thru notes here</Text>
        </Box>
      </Flex>
    </Center>
  );
};
export default DashboardScreen;
