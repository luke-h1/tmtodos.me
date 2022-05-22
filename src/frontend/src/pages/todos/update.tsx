import { Button, Checkbox, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/InputField';
import { Layout } from '../../components/Layout';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoContext } from '../../context/TodoContext';
import { useEffect } from 'react';

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

const TodoUpdatePage = () => {
  const params = useParams();
  const { state, getTodo, updateTodo } = useTodoContext();

  useEffect(() => {
    getTodo(parseInt(params.id as string, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  if (!state.todo) {
    return null;
  }

  return (
    <Layout variant="small">
      <Formik<FormValues>
        initialValues={{
          title: state.todo.title,
          body: state.todo.body,
          completed: state.todo.completed,
        }}
        validationSchema={todoCreateSchema}
        onSubmit={async values => {
          const { body, completed, title } = values;

          const todo = await updateTodo(
            parseInt(params.id as string, 10),
            body,
            title,
            completed,
          );
          navigate(`/todo/${todo.id}`);
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
              Update todo
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default TodoUpdatePage;
