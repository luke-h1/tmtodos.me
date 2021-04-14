import styled from '@emotion/styled';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Spinner } from '../components/Spinner';
import { useTodosQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  width: 1000px;
`;

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
            <Wrapper>
              <Link href="/todo[id]" as={`/todo/${t.id}`}>
                <div className="hover:bg-gray-100 focus:outline-none focus:ring-2 cursor-pointer rounded mb-4 min-w-lg w-full">
                  <div className="border-gray-300 p-5 rounded-md shadow-lg">
                    <h4 className="text-xl font-semibold mb-2 text-left">{t.title}</h4>
                    <p className="text-md font-semibold mb-2 text-left">{t.textSnippet}</p>
                    <div className="flex mt-5">
                      <p className="text-left">{t.creator.email}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </Wrapper>
          )))}
          {data && data.todos.hasMore ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="button"
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.todos.todos[data.todos.todos.length - 1].createdAt,
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
