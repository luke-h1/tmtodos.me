import {
  Box, ButtonGroup, Flex, IconButton, Link, Stack, Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Logo from 'Icons/Logo';

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      py="8"
      bottom={0}
      pos="sticky"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        align="center"
      >
        <a aria-current="page" aria-label="Back to Home page" href="/" rel="home">
          <Logo />
        </a>
        <Stack
          my={{ base: '6', md: 0 }}
          direction={{ base: 'column', md: 'row' }}
          marginStart={{ md: '8' }}
          fontSize="sm"
          spacing={{ base: '2', md: '8' }}
          textAlign={{ base: 'center', md: 'start' }}
        >
          <Text>
            {' '}
            Take My Notes
          </Text>
          <Link>Privacy</Link>
          <Link>License</Link>
        </Stack>
        <ButtonGroup marginStart={{ md: 'auto' }} color="gray.600" variant="ghost">
          <IconButton as="a" href="https://github.com/luke-h1/take-my-notes.com" target="_blank" aria-label="LinkedIn" icon={<FaGithub />} />
        </ButtonGroup>
      </Flex>
    </Box>
  );
};
export default Footer;
