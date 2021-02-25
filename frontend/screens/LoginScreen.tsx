import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Flex, Heading } from '@chakra-ui/react';

const LoginScreen = () => (
  <>
    <Flex direction="column" justify="center" align="center" mb="8">
      <Box>
        <Heading as="h1" fontSize="40px" mb={4}>
          Login
        </Heading>
      </Box>
    </Flex>
  </>
);
export default LoginScreen;
