import { Text, Flex, Box } from '@chakra-ui/react';
import { Button } from 'components/Button';
import Link from 'next/link';

const HomeScreen = () => {
  return (
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
  );
};
export default HomeScreen;
