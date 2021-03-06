import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Center, Flex, FormLabel, Input, Button } from '@chakra-ui/react';
import Loader from 'components/Loader';
import Error from 'components/Error';

const UserEditScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user.isAdmin) {
      router.push('/');
    }
  }, [user, router.query]);

  const submitHandler = (e) => {
    e.preventDefault();
    // update the user...
  };

  return (
    <>
      <Center>
        {/* {loadingUpdate && <Loader />}
        {loading && <Loader />}
        {errorUpdate && <Error>{errorUpdate}</Error>}
        {error && <Error>{error}</Error>} */}

        <Flex direction="column" justify="center" align="center">
          <form onSubmit={submitHandler}>
            <Input
              placeholder="name"
              name="name"
              type="input"
              mb={10}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email"
              name="email"
              type="input"
              mb={5}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>Admin user</FormLabel>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <div>
              <Button mt={5} type="submit">
                Update user
              </Button>
            </div>
          </form>
        </Flex>
      </Center>
    </>
  );
};
export default UserEditScreen;
