import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import Card from '../components/Card';
import { Layout } from '../components/Layout';
import { useTodoContext } from '../context/TodoContext';

const Home = () => {
  const { getTodos, state } = useTodoContext();

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Stack>
        {state.todos &&
          state.todos.map(todo => <Card key={todo.id} todo={todo} />)}
      </Stack>
    </Layout>
  );
};
export default Home;
