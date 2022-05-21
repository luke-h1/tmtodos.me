import React from 'react';
import { Box, IconButton, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import todoService from '../services/todoService';

interface Props {
  id: number;
  userId: number;
}

const EditDeleteTodoButtons = ({ id, userId }: Props) => {
  return (
    <Box>
      <Link to={`/todo/${id}`}>
        <IconButton
          as={ChakraLink}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit todo"
        />
      </Link>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete todo"
        onClick={async () => {
          await todoService.deleteTodo(id);
        }}
      />
    </Box>
  );
};
export default EditDeleteTodoButtons;
