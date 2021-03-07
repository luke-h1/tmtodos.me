import React, { useContext, useEffect } from 'react';
import { NextSeo } from 'next-seo';

import {
  Formik, Form, useField, FieldAttributes,
} from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import AuthContext from 'context/auth/authContext';
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
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { register, token } = authContext;

  return (
    <>
      <NextSeo
        title="Register | Take My Notes"
        canonical="https://take-my-notes.com/register"
        openGraph={{
          url: 'https://take-my-notes.com/register',
          title: 'Register | take-my-notes.com',
        }}
      />
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
      <Flex
        direction="column"
        justify="center"
        align="center"
        mx="auto"
        maxW="660px"
      >
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(data, { setSubmitting }) => {
            const { name, email, password } = data;
            setSubmitting(true);
            register(name, email, password);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <>
              <Form>
                {/* {error && <Error>{error}</Error>}
                {loading && <Loader />} */}
                <CustomInput
                  placeholder="name"
                  name="name"
                  type="input"
                  as={Input}
                />
                <CustomInput
                  placeholder="email"
                  name="email"
                  type="input"
                  as={Input}
                />
                <CustomInput
                  placeholder="password"
                  name="password"
                  type="password"
                  as={Input}
                />
                <CustomInput
                  placeholder="confirmPassword"
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
