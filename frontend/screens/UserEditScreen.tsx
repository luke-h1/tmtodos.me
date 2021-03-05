import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from 'components/Loader';
import Error from 'components/Error';
import Message from 'components/Message';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Center,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Button,
  CheckboxGroup,
  HStack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { updateSchema } from 'validations/userValidation';
import { userInfo } from 'node:os';
import { getUserDetails, updateUser } from '../store/actions/userActions';
import { USER_UPDATE_RESET } from '../store/constants/userConstants';

const UserEditScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      router.push('/');
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      router.push('/admin/userlist');
    } else if (user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, dispatch, id, successUpdate, router.query]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id: id, name, email, isAdmin,
    }));
  };

  return (
    <>
      <Center>
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
              <Button mt={5} type="submit">Update user</Button>
            </div>
          </form>
        </Flex>
      </Center>
    </>
  );
};
export default UserEditScreen;
