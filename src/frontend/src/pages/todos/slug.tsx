import { Heading, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Todo } from '../../context/AuthContext';
import todoService from '../../services/todoService';
import EditDeleteTodoButtons from '../../components/EditDeleteTodoButtons';

const TodoSlugPage = () => {
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

  if (!todo) {
    return null;
  }

  return (
    <Layout>
      <Heading mb={4}>{todo.title}</Heading>
      <Box mb={4}>{todo.body}</Box>
      <EditDeleteTodoButtons
        id={parseInt(todo.id, 10)}
        userId={todo.userId}
        onDelete={async () => {
          await todoService.deleteTodo(parseInt(todo.id, 10));
        }}
      />
    </Layout>
  );
};

export default TodoSlugPage;
