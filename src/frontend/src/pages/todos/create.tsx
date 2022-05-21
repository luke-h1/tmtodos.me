import { Button, Checkbox, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Layout } from '../../components/Layout';
import * as yup from 'yup';

interface FormValues {
  title: string;
  body: string;
  completed: boolean;
}

const todoCreateSchema = yup.object({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  completed: yup.boolean(),
});

const TodoCreatePage = () => {
  const [checkedItem, setCheckedItem] = useState<boolean>(false);
  return (
    <Layout variant="small">
      <Formik<FormValues>
        initialValues={{ title: '', body: '', completed: false }}
        validationSchema={todoCreateSchema}
        onSubmit={async values => {
          console.log(values);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <InputField name="body" placeholder="body" label="body" />
            <Spacer mb={4} />
            <Checkbox
              size="md"
              colorScheme="blue"
              variant="gray"
              borderRadius={4}
              border={'#e6e6e6'}
              type="checkbox"
              id="completed"
              name="completed"
              onChange={e => setFieldValue('completed', e.target.checked)}
            >
              Complete
            </Checkbox>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variant="teal"
            >
              create todo
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default TodoCreatePage;
