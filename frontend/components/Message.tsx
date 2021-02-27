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

const Message: React.FC<Iprops> = ({ children }) => {
  return (
    <>
      <Flex justifyItems="center" justifyContent="center" direction="column" align="center">
        <Alert status="success" w={200} align="center" borderRadius={10} mb={8}>
          <AlertIcon />
          <AlertTitle mr={2}>Message:</AlertTitle>
          <AlertDescription color="black">{children}</AlertDescription>
        </Alert>
      </Flex>
    </>
  );
};
export default Message;
