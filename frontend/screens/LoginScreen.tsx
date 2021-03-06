import React, { useEffect, useContext } from 'react';
import {
  Formik, Form, useField, FieldAttributes,
} from 'formik';
import * as yup from 'yup';
import AuthContext from 'context/auth/authContext';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Heading,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { Button } from 'components/Button';
import { LoginSchema } from 'validations/userValidation';
import Error from 'components/Error';
import Loader from 'components/Loader';

const CustomInput: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const { type } = props;
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
        type={type}
        mb={6}
      />
    </>
  );
};

const RegisterScreen: React.FC = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const {
    login, user, isAuthenticated, error,
  } = authContext;

  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
    if (error) {
      console.log(`errors > ${error}`);
    }
  }, [router, user]);

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
            Login
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
            email: '',
            password: '',

          }}
          validationSchema={LoginSchema}
          onSubmit={(data, { setSubmitting }) => {
            const { email, password } = data;
            setSubmitting(true);
            login(email, password);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <>
              <Form>
                {/* {error && <Error>{error}</Error>}
                {loading && <Loader />} */}
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
                />

                <FormLabel as="p" color="red">
                  {' '}
                  {errors.email || errors.password ? 'Invalid credentials!' : ''}
                </FormLabel>

                <Button as="button" disabled={isSubmitting} type="submit">
                  Login
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
