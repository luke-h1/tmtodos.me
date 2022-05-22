import { Box, Heading, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { Todo, useTodoContext } from '../context/TodoContext';
import { format, parseISO } from 'date-fns';
import EditDeleteTodoButtons from './EditDeleteTodoButtons';
import { Link } from 'react-router-dom';

interface Props {
  todo: Todo;
}

const Card = ({ todo }: Props) => {
  const { deleteTodo } = useTodoContext();
  return (
    <>
      <Box
        key={todo.id}
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        data-testid="todo-card"
        overflow={'hidden'}
      >
        <Link to={`/todo/${todo.id}`}>
          <Stack>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {todo.title}
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {todo.body}
            </Heading>
          </Stack>
        </Link>

        <Text fontWeight={600}>{todo.completed}</Text>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text color={'gray.500'}>
              Updated: {format(parseISO(todo.updatedAt), 'MMMM d, yyyy')}
            </Text>
            <Text color={'gray.500'}>
              Created: {format(parseISO(todo.createdAt), 'MMMM d, yyyy')}
            </Text>
          </Stack>
        </Stack>
        <Box ml="auto">
          <EditDeleteTodoButtons
            key={todo.id}
            id={todo.id}
            userId={todo.userId}
            onDelete={async () => {
              await deleteTodo(todo.id);
            }}
          />
        </Box>
      </Box>
    </>
  );
};
export default Card;
