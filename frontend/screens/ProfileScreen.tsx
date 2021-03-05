import React, { useEffect, useState } from 'react';
import {
  Formik, Form, useField, FieldAttributes,
} from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { Button } from 'components/Button';
import { RegisterSchema } from 'validations/userValidation';
import Error from 'components/Error';
import Loader from 'components/Loader';
import { USER_UPDATE_RESET } from 'store/constants/userConstants';
import { register, updateUser } from '../store/actions/userActions';

const CustomInput: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <>
      <FormLabel>{placeholder}</FormLabel>
      <Input
        {...field}
        placeholder={placeholder}
        error={!!errorText}
        FormErrorMessage={errorText}
        mb={6}
      />
    </>
  );
};
const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading, error, userInfo, user,
  } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);

  const dispatch = useDispatch();

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      console.log('good :)');
    } else {
        console.log(user)
      setName(user.name);
      setEmail(user.email);
    }
  }, [router, userInfo]);

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH={50}
        mb={10}
      >
        <Box>
          <Heading as="h1" fontSize="40px" mb={4}>
            Update your details
          </Heading>
        </Box>
      </Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        mx="auto"
        maxW="660px"
      >
        <Formik
          initialValues={{
            name,
            email,
            password,
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(data, { setSubmitting }) => {
            const { name, email, password } = data;
            setSubmitting(true);
            const { _id } = userInfo;
            dispatch(updateUser({
              _id, name, email, password,
            }));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <>
              <Form>
                {error && <Error>{error}</Error>}
                {loading && <Loader />}
                <CustomInput
                  placeholder="Name"
                  name="name"
                  type="input"
                  as={Input}
                  value={name}
                />
                <CustomInput
                  placeholder="Email"
                  name="email"
                  type="input"
                  as={Input}
                />
                <CustomInput
                  placeholder="Password"
                  name="password"
                  type="password"
                  as={Input}
                />
                <CustomInput
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  as={Input}
                />
                <FormLabel as="p" color="red">
                  {' '}
                  {errors.confirmPassword && 'Passwords Should Match!'}
                </FormLabel>

                <Button as="button" disabled={isSubmitting} type="submit">
                  Register
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Flex>
    </>
  );
};

export default RegisterScreen;
