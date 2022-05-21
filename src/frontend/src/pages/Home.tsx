import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Layout } from '../components/Layout';
import { Todo } from '../context/AuthContext';
import todoService from '../services/todoService';

const Home = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const fetchTodos = async () => {
    const res = await todoService.getTodos();
    console.log(res.data);
    setTodos(res.data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <Layout>
      <Stack>
        {todos && todos.map(todo => <Card key={todo.id} todo={todo} />)}
      </Stack>
    </Layout>
  );
};
export default Home;
