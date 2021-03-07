import React, {
  useState, useContext,
} from 'react';
import { NextSeo } from 'next-seo';

import { useRouter } from 'next/router';
import {
  Center, Flex, FormLabel, Input, Button,
} from '@chakra-ui/react';
import Loader from 'components/Loader';
import Error from 'components/Error';
import UserContext from 'context/user/userContext';
import AuthContext from 'context/auth/authContext';
import { setNestedObjectValues } from 'formik';
import Message from 'components/Message';

const UserEditScreen = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const { user: AuthUser, loading } = authContext;
  const {
    users, user, userInfo, updateUser, getUserDetails, success, resetUpdateUser, loading: userLoading, error,
  } = userContext;
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`ID: ${id}  NAME: ${name} EMAIL: ${email} ISADMIN: ${isAdmin}`);
    updateUser({
      _id: id, name, email, isAdmin,
    });
    setMessage('user updated');
    setTimeout(() => {
      setMessage('');
      router.push('/admin/userlist');
    }, [1000]);
  };

  return (
    <>
      <NextSeo
        title="Edit Users | Take My Notes"
        canonical="https://take-my-notes.com/admin/useredit"
        openGraph={{
          url: 'https://take-my-notes.com/admin/useredit',
          title: 'Edit Users | take-my-notes.com',
        }}
      />
      <Center>
        {loading && <Loader />}
        {' '}
        {error && <Error>{error}</Error>}
        {!userLoading || !loading || !error }
        {!userLoading || !error ? (
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
            <Flex direction="column" justify="center" align="center" mt={10}>
              {message && <Message>{message}</Message>}
            </Flex>
          </Flex>
        ) : ''}
      </Center>
    </>
  );
};
export default UserEditScreen;
