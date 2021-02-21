import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

const Loader: React.FC = () => (
  <Flex direction="column" align="center">
    <Spinner size="xl" />
  </Flex>
);

export default Loader;
