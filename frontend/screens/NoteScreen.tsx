import React, { useState, useEffect } from 'react';
import {
  Flex, Box, Center, Text, Heading, Input,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'components/TextArea';
import Loader from 'components/Loader';
import Error from 'components/Error';
import { Button } from 'components/Button';
import { parseISO, format } from 'date-fns';
import { uuid } from 'uuidv4';

import {
  createNote,
  updateNote,
  deleteNote,
  listNotes,
} from '../store/actions/noteActions';

const NoteScreen = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const noteCreate = useSelector((state) => state.noteCreate);
  const noteList = useSelector((state) => state.noteList);

  const { loading: noteLoading, errors: noteErrors, notes } = noteList;

  const { loading, error } = noteCreate;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote(uuid(), title, body));
    dispatch(listNotes());
  };

  useEffect(() => {
    dispatch(listNotes());
  }, []);

  return (
    <Center>
      <Flex direction="column" justify="center" align="center">
        <Text as="h1" fontSize="40px">
          Notes
        </Text>
        {error && <Error>{error}</Error>}
        {loading && <Loader />}

        <Flex
          direction="column"
          justify="center"
          align="center"
          mx="auto"
          maxW="660px"
          minH="500px"
        >
          <Input
            placeholder="note title"
            FormErrorMessage="enter a title"
            p="7"
            mb={6}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
        <Flex direction="column" justify="center" align="center">
          {noteLoading && <Loader />}
          {noteErrors && <Error>{noteErrors}</Error>}
          {notes && notes.map((n) => (
            <>
              <Box
                key={n.id}
                shadow="sm"
                rounded="md"
                data-testid="card"
                maxW="md"
                minW="lg"
                mt={4}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                _hover={{ color: '#2EC0F9' }}
              >
                <Heading m="5" mb="2" as="h1" size="lg">
                  {n.title}
                </Heading>
                <Text m="5" mt="2" mb="4">
                  {n.body}
                </Text>
                <Text m="5" mt="2" mb="4">
                  {format(parseISO(n.updatedAt), 'MMMM dd, yyyy')}
                </Text>
              </Box>
            </>
          ))}

          {' '}
        </Flex>
      </Flex>
    </Center>
  );
};
export default NoteScreen;
