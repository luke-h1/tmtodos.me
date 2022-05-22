import { Heading, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { useTodoContext } from '../../context/TodoContext';
import todoService from '../../services/todoService';
import EditDeleteTodoButtons from '../../components/EditDeleteTodoButtons';

const TodoSlugPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state, getTodo } = useTodoContext();

  useEffect(() => {
    getTodo(parseInt(params.id as string, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.todo) {
    return null;
  }

  return (
    <Layout>
      <Heading mb={4}>{state.todo.title}</Heading>
      <Box mb={4}>{state.todo.body}</Box>
      <EditDeleteTodoButtons
        id={state?.todo?.id}
        userId={state.todo.userId}
        onDelete={async () => {
          await todoService.deleteTodo(state?.todo?.id as number);
          navigate('/');
        }}
      />
    </Layout>
  );
};

export default TodoSlugPage;
