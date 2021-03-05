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

  const { loading: loadingList, errors, notes } = noteList;

  const { loading, error } = noteCreate;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote(title, body, ));
  };

  useEffect(() => {
    if (notes && notes.length !== 0) {
      dispatch(listNotes());
    }
  }, [loading]);

  return (
    <Center>
      <Flex direction="column" justify="center" align="center">
        <Text as="h1" fontSize="40px">
          Notes
        </Text>
        {error && <Error>{error}</Error>}
        {loading ? <Loader /> : loadingList && <Loader />}

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
          {notes.length !== 0 && console.log(notes)}
        </Flex>
      </Flex>
    </Center>
  );
};
export default NoteScreen;
