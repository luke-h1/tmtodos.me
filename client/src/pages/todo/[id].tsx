import { CustomHead } from 'components/CustomHead';
import { EditDeleteTodoButtons } from 'components/EditDeleteTodoButtons';
import { Flex } from 'components/Flex';
import { Spinner } from 'components/Spinner';
import { NextSeo } from 'next-seo';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from 'utils/createUrqlClient';
import { useGetTodoFromUrl } from 'utils/useGetTodoFromUrl';
// import { parseISO, format } from 'date-fns';

interface SingleTodoProps {}

const SingleTodo: React.FC<SingleTodoProps> = () => {
  const [{ data, error, fetching }] = useGetTodoFromUrl();
  if (fetching) {
    return (
      <Flex>
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.todo) {
    return (
      <Flex>
        <h1 className="text-2xl text-center mt-5">Could not find todo</h1>
      </Flex>
    );
  }
  return (
    <>
      <Flex>
        <CustomHead
          title={`todo - ${data.todo.title} | tmtodos.me`}
          description={`view your todo - ${data.todo.title}`}
        />
        <NextSeo
          title={`todo - ${data.todo.title} | tmtodos.me`}
          canonical={`https://tmtodos.me/todo/${data.todo.id}`}
          openGraph={{
            url: `https://tmtodos.me/todo/${data.todo.id}`,
            title: `todo - ${data.todo.title}`,
          }}
        />
        <div className="flex flex-col justify-center mb-5">
          <h1 className="text-3xl dark:text-gray-300">{data?.todo?.title}</h1>
        </div>
        <div className="flex flex-col justify-between mt-2 mb-5" />

        <hr />
        <div className="prose dark:prose-dark max-w-md w-full">
          <p className="text-md mt-4 mb-4 leading-10 tracking-wider dark:text-gray-300 prose dark:prose-dark max-w-none w-full">
            {data?.todo?.text}
          </p>
        </div>
        <div className="flex flex-col align-center items-center">
          <EditDeleteTodoButtons
            id={data.todo.id}
            creatorId={data.todo.creator.id}
          />
        </div>
      </Flex>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(SingleTodo);
