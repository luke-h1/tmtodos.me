import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Center,
  Text,
  Heading,
  Input,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'components/TextArea';
import Loader from 'components/Loader';
import Error from 'components/Error';
import { parseISO, format } from 'date-fns';
import { uuid } from 'uuidv4';
import { ImCross } from 'react-icons/im';
import styled from '@emotion/styled';

import { userInfo } from 'node:os';
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
    setTitle('');
    setBody('');
  };

  const Cross = styled(ImCross)`
    margin: 20px 0 0 20px;
    &:hover {
      cursor: pointer;
      color: red;
    }
  `;

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteNote(id));
  };

  useEffect(() => {
    dispatch(listNotes());
  }, [noteCreate]);

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
          {!noteLoading || !noteErrors
            ? notes
              && notes.map((n) => (
                <>
                  <Box
                    key={n._id}
                    shadow="sm"
                    rounded="md"
                    data-testid="card"
                    maxW="lg"
                    minW="sm"
                    mt={4}
                    borderWidth="1px"
                    borderRadius="md"
                    overflow="hidden"
                    _hover={{ color: '#2EC0F9' }}
                  >
                    <Flex direction="column">
                      <Cross onClick={(e) => handleDelete(e, n._id)} />
                    </Flex>

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
              ))
            : ''}
        </Flex>
      </Flex>
    </Center>
  );
};
export default NoteScreen;
