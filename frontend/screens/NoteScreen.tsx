import React from 'react';
import {
  Flex, Box, Center, Text, Heading,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

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
        mb={6}
      />
    </>
  );
};

const NoteScreen = () => {
  const createNote = useSelector((state) => state.userLogin);
  const { loading, error, createNote } = userRegister;
  const dispatch = useDispatch();

  return (
    <Center>
      <Flex direction="column" justify="center" align="center">
        <Text as="h1" fontSize="40px">
          Notes
        </Text>

        <Box minW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box m="5" p="5" as="div">
            <Heading m="5" mb="0" as="h4" size="md">Title</Heading>
            <Text m="5" mt="0">Body</Text>
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};
export default NoteScreen;
