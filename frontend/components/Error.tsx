import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from '@chakra-ui/react';

interface Iprops {
  children: string;
}

const Error: React.FC<Iprops> = ({ children }) => {
  return (
    <>
      <Flex justifyItems="center" justifyContent="center" direction="column" align="center">
        <Alert status="error" w={250} align="center" borderRadius={10} mb={8}>
          <AlertIcon />
          <AlertTitle mr={2}>Error:</AlertTitle>
          <AlertDescription color="#000">{children}</AlertDescription>
        </Alert>
      </Flex>
    </>
  );
};
export default Error;
