import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(20).required(),
});

export const RegisterSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(20).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

export const updateSchema = yup.object().shape({
  name: yup.string().test(
    (name) => !name || name.length === 0,
  ),
  email: yup.string().email().test(
    (email) => !email || email.length === 0,
  ),
});
