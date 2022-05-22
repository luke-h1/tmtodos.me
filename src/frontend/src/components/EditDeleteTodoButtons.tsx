import React from 'react';
import { Box, IconButton, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface Props {
  id: number;
  userId: number;
  onDelete: (id: number) => void;
}

const EditDeleteTodoButtons = ({ id, onDelete }: Props) => {
  return (
    <Box>
      <Link to={`/todo/update/${id}`}>
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
        data-testid="delete-todo"
        onClick={() => onDelete(id)}
      />
    </Box>
  );
};
export default EditDeleteTodoButtons;
