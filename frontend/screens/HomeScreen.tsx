import React from 'react';
import Link from 'next/link';

import {
  ListItem,
  UnorderedList,
  Container,
  Heading,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';

const HomeScreen = () => (
  <>
    <Container>
      <Heading fontSize="40px">Take My Notes</Heading>
      <Text fontSize="20px" mb={10}>
        Take My notes is a full stack, privacy oriented, open source note taking
        app
      </Text>
      <Box mb={10}>
        <Text fontSize="25px">Features</Text>
        <UnorderedList>
          <ListItem>
            MongoDB for storing your notes no matter what device you're on
          </ListItem>
          <ListItem>Express / Node for a performant, lightweight API</ListItem>
          <ListItem>Next JS for a great frontend experience</ListItem>
          <ListItem>Perform full CRUD operations on Notes</ListItem>
          <ListItem>Edit your profile</ListItem>
        </UnorderedList>
      </Box>
      <Box mb={4}>
        <Text fontSize="40px" mb={4}>Get started today</Text>
        <Button colorScheme="teal" size="md">
          <Link href="/register">register ⚡️</Link>
        </Button>
        {' '}
      </Box>
      <Box>
        <Text fontSize="40px" mb={4}>Already a user ?</Text>
        <Button colorScheme="teal" size="md">
          <Link href="/login">Login 😎</Link>
        </Button>
        {' '}
      </Box>
    </Container>
  </>
);
export default HomeScreen;
