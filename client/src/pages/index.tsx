import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Spinner } from '../components/Spinner';
import { TodoItem } from '../components/TodoItem';
import { useTodosQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = useTodosQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <h1>Query Failed</h1>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {!data && fetching ? (
        <Spinner />
      ) : (
        <>
          {data!.todos.todos.map((t) => (!t ? null : (
            <div
              className="max-w-md rounded focus:ring mx-auto w-full"
              key={t.id}
            >
              <TodoItem
                title={t.title}
                textSnippet={t.textSnippet}
                email={t.creator.email}
                id={t.id}
                creatorId={t.creator.id}
              />
            </div>
          )))}
          {data && data.todos.hasMore ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="button"
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.todos.todos[data.todos.todos.length - 1].createdAt,
                });
              }}
            >
              Load More todos
            </button>
          ) : null}
        </>
      )}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
