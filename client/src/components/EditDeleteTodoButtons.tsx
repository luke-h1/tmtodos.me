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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5"
          type="button"
        >
          <FiEdit3 />
        </button>
      </Link>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        aria-label="delete todo"
        onClick={() => {
          deleteTodo({ id });
        }}
      >
        <FiDelete />
      </button>
    </div>
  );
};
