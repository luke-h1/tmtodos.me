import * as yup from 'yup';

export const noteSchema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});
