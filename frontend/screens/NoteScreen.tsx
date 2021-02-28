import {
  Flex, Box, Heading, Checkbox, Button, Input,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

const NoteScreen = () => {
  return (
    <>
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH={50}
        mb={10}
      >
        <Box>
          <Heading>Notes</Heading>
          <Flex pt={7}>
            <Checkbox />
            <Input
              p={20}
              mx={2}

            />
            <Button>
              Delete
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
export default NoteScreen;
