import { EditDeleteTodoButtons } from 'components/EditDeleteTodoButtons';
import { Flex } from 'components/Flex';
import { Spinner } from 'components/Spinner';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from 'utils/createUrqlClient';
import { useGetTodoFromUrl } from 'utils/useGetTodoFromUrl';

interface SingleTodoProps {

}

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
    <Flex>
      <h1 className="text-center text-2xl">{data?.todo?.title}</h1>
      <div className="my-4 text-1xl">
        {data?.todo?.text}
      </div>
      <EditDeleteTodoButtons
        id={data.todo.id}
        creatorId={data.todo.creator.id}
      />
    </Flex>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(SingleTodo);
