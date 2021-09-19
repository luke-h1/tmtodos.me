import React from 'react';
import { FiDelete, FiEdit3 } from 'react-icons/fi';
import Link from 'next/link';
import { useDeleteTodoMutation, useMeQuery } from '../generated/graphql';

interface EditDeleteTodoButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeleteTodoButtons: React.FC<EditDeleteTodoButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deleteTodo] = useDeleteTodoMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <div className="my-2">
      <Link href={`/todo/edit/${id}`}>
        <button
          className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-lg"
          type="button"
          data-testid={`edit-todo-${id}`}
        >
          {' '}
          <FiEdit3 />
        </button>
      </Link>
      <button
        className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-lg"
        type="button"
        aria-label="delete todo"
        data-testid={`delete-todo-${id}`}
        onClick={() => {
          deleteTodo({ id });
        }}
      >
        {' '}
        <FiDelete />
      </button>
    </div>
  );
};
