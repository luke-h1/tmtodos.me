import { CustomHead } from 'components/CustomHead';
import { Formik, Form } from 'formik';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Flex } from '../../../components/Flex';
import { InputField } from '../../../components/InputField';
import { Spinner } from '../../../components/Spinner';
import {
  useTodoQuery,
  useUpdateTodoMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';

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

  // Check if ID is valid

  if (!data?.todo) {
    return (
      <Flex>
        <h1 className="text-center text-2xl">Could not find todo</h1>
      </Flex>
    );
  }

  return (
    <>
      <CustomHead title={`Edit Todo - ${data.todo.title} | tmtodos.me`} description={`Edit your todo - ${data.todo.title}`} />
      <NextSeo
        title={`Edit todo - ${data.todo.title} | tmtodos.me`}
        canonical={`https://tmtodos.me/todo/edit/${data.todo.id}`}
        openGraph={{
          url: `https://tmtodos.me/todo/edit/${data.todo.id}`,
          title: `Edit todo - ${data.todo.title}`,
        }}
      />
      <Flex>
        <Formik
          initialValues={{ title: data.todo.title, text: data.todo.text }}
          onSubmit={async (values) => {
            await updateTodo({ id: intId, ...values });
            /**
             * Once user has updated their todo take them back to last
             * page they were viewing
             */
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="title" />
              <div className="mt-4 mb-4">
                <InputField name="text" placeholder="text" label="body" />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
