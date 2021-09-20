import { CustomHead } from '@src/components/CustomHead';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Flex } from '@src/components/Flex';
import { InputField } from '@src/components/InputField';
import { useCreateTodoMutation } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useIsAuth } from '@src/utils/useIsAuth';

interface FormValues {
  title: string;
  text: string;
}

const CreateTodoPage: React.FC<{}> = () => {
  const router = useRouter();
  useIsAuth();
  const [, createTodo] = useCreateTodoMutation();
  return (
    <>
      <CustomHead
        title="Create todo | tmtodos.me"
        description="create a todo"
      />
      <NextSeo
        title="Create todo"
        canonical="https://tmtodos.me/create-todo"
        openGraph={{
          url: 'https://tmtodos.me/create-todo',
          title: 'create todo',
        }}
      />
      <Flex>
        <Formik<FormValues>
          initialValues={{ title: '', text: '', image: '' }}
          onSubmit={async (values) => {
            const { error } = await createTodo({
              input: {
                title: values.title,
                text: values.text,
              },
            });
            if (!error) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                placeholder="title"
                label="title"
                data-testid="title"
              />
              <div className="mt-4 mb-4">
                <InputField
                  name="text"
                  placeholder="text"
                  label="body"
                  data-testid="body"
                />
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5"
                type="submit"
                disabled={isSubmitting}
              >
                Create Todo
              </button>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(CreateTodoPage);
