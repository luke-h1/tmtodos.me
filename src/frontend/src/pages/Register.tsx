import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import authService from '../services/authService';
import * as yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(70),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper variant="small">
      <Formik<FormValues>
        validationSchema={registerSchema}
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { firstName, lastName, email, password } = values;
          const res = await authService.register(
            firstName,
            lastName,
            email,
            password,
          );

          if (res?.errors && res.errors.length) {
            setErrors({
              email: res.errors[0].message,
            });
          } else {
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.token}`;
            navigate('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="firstName"
              placeholder="firstName"
              label="First Name"
            />
            <InputField
              name="lastName"
              placeholder="lastName"
              label="Last Name"
            />
            <InputField name="email" placeholder="email" label="Email" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variant="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default RegisterPage;
