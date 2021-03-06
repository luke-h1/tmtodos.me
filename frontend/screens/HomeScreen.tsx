import { useContext } from 'react';
import Link from 'next/link';
import AuthContext from 'context/auth/authContext';
import { Text, Flex } from '@chakra-ui/react';
import { Button } from 'components/Button';

const HomeScreen = () => {
  const authcontext = useContext(AuthContext);

  const { name, user } = authcontext;
  return (
    <>
      {/* <Flex direction="column" align="center">
        <Text fontSize="60px" mb={10}>
          Take My Notes
        </Text>
        {isAuthenticated && user ? (
          <Text fontSize="30px">
            👋
            {user.name}
          </Text>
        ) : (
          <Link href="/register">
            <Button>Sign Up</Button>
          </Link>
        )}
      </Flex> */}
      <h1>hello</h1>
    </>
  );
};
export default HomeScreen;
