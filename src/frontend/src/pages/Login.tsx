import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import authService from '../services/authService';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(70),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { setState } = useAuthContext();

  return (
    <Wrapper variant="small">
      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { email, password } = values;
          const res = await authService.login(email, password);

          if (res?.errors && res.errors.length) {
            setErrors({
              email: res.errors[0].message,
            });
          } else {
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.token}`;

            setState({
              user: {
                loading: false,
                id: res.data.user.id,
                firstName: res.data.user.firstName,
                lastName: res.data.user.lastName,
                email: res.data.user.email,
                todos: res.data.user.todos,
                role: res.data.user.role,
                createdAt: res.data.user.createdAt,
                updatedAt: res.data.user.updatedAt,
              },
              ready: true,
            });

            navigate('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default LoginPage;
