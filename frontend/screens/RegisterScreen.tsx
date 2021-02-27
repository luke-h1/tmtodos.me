import { useState, useEffect, useContext } from 'react';
import {
  Formik, Field, Form, useField, FieldAttributes,
} from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import Loader from 'components/Loader';
import { Button } from 'components/Button';
import Message from 'components/Message';
import Error from 'components/Error';
import { RegisterSchema } from 'validations/userValidation';
import { register } from '../store/actions/userActions';

// const submitHandler = (e) => {
//   e.preventDefault();
//   if (password !== confirmPassword) {
//     setMessage('Passwords do not match');
//   } else {
//     dispatch(register(name, email, password));
//   }
// };

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
const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      router.push('/dashboard');
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
            Register
          </Heading>
        </Box>
      </Flex>

      {message && <Message>{message}</Message>}
      {error && <Error>{error}</Error>}
      {loading && <Loader />}
      <Flex
        direction="column"
        justify="center"
        align="center"
        mx="auto"
        maxW="660px"
      >
        <Formik
          initialValues={{
            name: '', email: '', password: '', confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make call to backend here...
            console.log('formdata >', data);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <>
              <Flex direction="column" align="center">
                <CustomInput placeholder="name" name="name" type="input" as={Input} />
                <CustomInput placeholder="email" name="email" type="input" as={Input} />
                <CustomInput placeholder="password" name="password" type="input" as={Input} />
                <CustomInput placeholder="confirmPassword" name="confirmPassword" type="input" as={Input} />

              </Flex>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </>
          )}

        </Formik>

      </Flex>

      )
      {/* <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              mb={8}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              mb={8}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </FormControl>
          <Button type="submit">Register</Button>
        </form> */}
    </>
  );
};
export default RegisterScreen;
