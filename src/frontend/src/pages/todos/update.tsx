import { Button, Checkbox, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/InputField';
import { Layout } from '../../components/Layout';
import * as yup from 'yup';
import todoService from '../../services/todoService';
import { useNavigate, useParams } from 'react-router-dom';
import { Todo } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

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

  const [todo, setTodo] = useState<Todo | null>(null);

  const fetchTodo = async () => {
    const todo = await todoService.getTodo(params.id as string);
    setTodo(todo.data as unknown as Todo);
  };

  useEffect(() => {
    fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  if (!todo) {
    return null;
  }

  return (
    <Layout variant="small">
      <Formik<FormValues>
        initialValues={{
          title: todo.title,
          body: todo.body,
          completed: todo.completed,
        }}
        validationSchema={todoCreateSchema}
        onSubmit={async values => {
          const { body, completed, title } = values;

          const res = await todoService.update(1, body, title, completed);

          navigate(`/todo/${res.data.todo.id}`);
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
