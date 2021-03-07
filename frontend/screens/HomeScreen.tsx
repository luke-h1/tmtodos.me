import { Text, Flex, Box } from '@chakra-ui/react';
import { Button } from 'components/Button';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

const HomeScreen = () => {
  return (
    <>
      <NextSeo
        title="Home | Take My Notes"
        canonical="https://take-my-notes.com"
        openGraph={{
          url: 'https://take-my-notes.com',
          title: 'Home | take-my-notes.com',
        }}
      />
      <Flex direction="column" justify="center" align="center">
        <Text as="h1" fontSize="60px">
          Take My Notes
        </Text>
        <Box mt={10}>
          <Button>
            <Link href="/register">Sign Up</Link>
          </Button>
          <div>
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </Box>
      </Flex>
    </>
  );
};
export default HomeScreen;
