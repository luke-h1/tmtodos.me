import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Flex } from '../components/Flex';
import { InputField } from '../components/InputField';
import { useCreateNoteMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreateNotePage: React.FC<{}> = () => {
  const router = useRouter();
  useIsAuth();
  const [, createNote] = useCreateNoteMutation();
  return (
    <Flex>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createNote({ input: values });
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => ((
          <Form>
            <InputField name="title" placeholder="title" label="title" />
            <div className="mt-4 mb-4">
              <InputField name="text" placeholder="text" label="body" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
              Create Note
            </button>
          </Form>
        ))}
      </Formik>
    </Flex>
  );
};
export default withUrqlClient(createUrqlClient)(CreateNotePage);
