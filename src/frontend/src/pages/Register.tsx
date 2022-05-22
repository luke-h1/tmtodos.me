import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import * as yup from 'yup';
import { useAuthContext } from '../context/AuthContext';

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
  const { register } = useAuthContext();
  return (
    <Wrapper variant="small">
      <Formik<FormValues>
        validationSchema={registerSchema}
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={async values => {
          const { firstName, lastName, email, password } = values;
          await register(firstName, lastName, email, password);

          navigate('/');
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
