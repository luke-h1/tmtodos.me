import { CustomHead } from '@src/components/CustomHead';
import { Formik, Form } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Flex } from '@src/components/Flex';
import { InputField } from '@src/components/InputField';
import { Spinner } from '@src/components/Spinner';
import {
  useTodoQuery,
  useUpdateTodoMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';

interface FormValues {
  title: string;
  text: string;
  image: string;
}

const EditPage: React.FC<{}> = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useTodoQuery({
    /**
     * If the id is -1 we know the router is on the server side
     * So pause until the todo id is not -1
     * at this point we know the todo id & can go ahead with fetching the todo
     */
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateTodo] = useUpdateTodoMutation();

  if (fetching) {
    return (
      <Flex>
        <Spinner />
      </Flex>
    );
  }

  // Check if todo ID passed to router is valid

  if (!data?.todo) {
    return (
      <Flex>
        <h1 className="text-center text-2xl">Could not find todo</h1>
      </Flex>
    );
  }

  return (
    <>
      <CustomHead
        title={`Edit Todo - ${data.todo.title} | tmtodos.me`}
        description={`Edit your todo - ${data.todo.title}`}
      />
      <NextSeo
        title={`Edit todo - ${data.todo.title} | tmtodos.me`}
        canonical={`https://tmtodos.me/todo/edit/${data.todo.id}`}
        openGraph={{
          url: `https://tmtodos.me/todo/edit/${data.todo.id}`,
          title: `Edit todo - ${data.todo.title}`,
        }}
      />
      <Flex>
        <Formik<FormValues>
          initialValues={{
            title: data.todo.title,
            text: data.todo.text,
            image: data.todo.image,
          }}
          onSubmit={async (values) => {
            await updateTodo({
              id: intId,
              image: values.image,
              title: values.title,
              text: values.text,
            });
            /**
             * Once user has updated their todo take them back to last
             * page they were viewing
             */
            router.back();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
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
              <div className="mt-4 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={({ target: { validity, files } }) => {
                    if (validity.valid && files) {
                      setFieldValue('image', files[0]);
                      // set 'file' of the form data as files[0]
                    }
                  }}
                />
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5"
                type="submit"
                disabled={isSubmitting}
              >
                Update todo
              </button>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(EditPage);
