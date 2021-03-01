import React from 'react';
import {
  Flex,
  Box,
  Center,
  Text,
  Heading,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'components/TextArea';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import * as yup from 'yup';
import { noteSchema } from 'validations/noteValidation';
import {
  createNote,
  updateNote,
  deleteNote,
  listNotes,
} from '../store/actions/noteActions';

const CustomInput: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <>
      <FormLabel>{placeholder}</FormLabel>
      <Input
        {...field}
        placeholder={placeholder}
        error={!!errorText}
        FormErrorMessage={errorText}
        p="7"
        mb={6}
      />
    </>
  );
};

// createNote: createNoteReducer,
// updateNote: updateNoteReducer,
// deleteNote: deleteNoteReducer,
// listNotes: listNotesReducer,

const NoteScreen = () => {
  const dispatch = useDispatch();

  return (
    <Center>
      <Flex direction="column" justify="center" align="center">
        <Text as="h1" fontSize="40px">
          Notes
        </Text>
        <Flex
          direction="column"
          justify="center"
          align="center"
          mx="auto"
          maxW="660px"
          minH="500px"
        >
          <Formik
            initialValues={{
              title: '',
              body: '',
            }}
            validationSchema={noteSchema}
            onSubmit={(data, { setSubmitting }) => {
              const { title, body } = data;
              setSubmitting(true);
              dispatch(createNote(id, title, body));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Form>
                  {/* {error && <Error>{error}</Error>}
                {loading && <Loader />} */}

                  <CustomInput
                    placeholder="title"
                    name="title"
                    type="input"
                    as={Input}
                  />
                  <TextArea placeholder="body" name="body" />

                  <FormLabel as="p" color="red">
                    {' '}
                    {errors.title || errors.body
                      ? 'Please enter a title / body :)'
                      : ''}
                  </FormLabel>

                  <Button as="button" disabled={isSubmitting} type="submit">
                    Login
                  </Button>
                </Form>
              </Form>
            )}
          </Formik>
        </Flex>

        <Center>
          <Box minW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box m="5" p="5" as="div">
              <Heading m="5" mb="0" as="h4" size="md">
                Title
              </Heading>
              <Text m="5" mt="0">
                Body
              </Text>
            </Box>
          </Box>
        </Center>
      </Flex>
    </Center>
  );
};
export default NoteScreen;
