import React, { useEffect } from 'react';
import {
  Formik, Form, useField, FieldAttributes,
} from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Flex, Heading, FormLabel, Input, Center,
} from '@chakra-ui/react';

import { Button } from 'components/Button';
import { RegisterSchema } from 'validations/userValidation';
import Error from 'components/Error';
import Loader from 'components/Loader';
import { register } from '../store/actions/userActions';

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
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      router.push('/notes');
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
            dispatch(register(name, email, password));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <>
              <Form>
                {error && <Error>{error}</Error>}
                {loading && <Loader />}
                <Input
                  placeholder="name"
                  name="name"
                  type="input"
                  as={Input}
                  maxW="550px"
                />
                <Flex direction="column" justify="center" align="center">
                  <Input
                    mt={4}
                    mb={4}
                    placeholder="Email"
                    name="email"
                    type="input"
                    as={Input}
                  />
                  <Input
                    mt={4}
                    mb={4}
                    placeholder="Password"
                    name="password"
                    type="password"
                    as={Input}
                  />
                  <Input
                    mt={4}
                    mb={4}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <FormLabel as="p" color="red">
                    {' '}
                    {errors.confirmPassword && 'Passwords Should Match!'}
                  </FormLabel>

                  <Button as="button" disabled={isSubmitting} type="submit">
                    Register
                  </Button>
                </Flex>
              </Form>
            </>
          )}
        </Formik>
      </Flex>
    </>
  );
};

export default RegisterScreen;