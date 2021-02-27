import React from 'react';

import {
  ListItem,
  UnorderedList,
  Container,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react';

const AboutScreen = () => (
  <>
    <Container>
      <Heading fontSize="40px" mb={10}>Take My Notes</Heading>
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

    </Container>
  </>
);
export default AboutScreen;
