import Link from 'next/link';
import React from 'react';
import { EditDeleteTodoButtons } from './EditDeleteTodoButtons';

interface TodoItemProps {
  title: string;
  textSnippet: string;
  email: string;
  id: number;
  image: string;
  creatorId: number;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  title,
  textSnippet,
  email,
  image,
  id,
  creatorId,
}) => {
  return (
    <a className="p-2 w-full" key={id}>
      <div className="mb-3 border-gray-800 ring-gray-800 ">
        <div className="flex flex-col md:flex-row justify-left">
          <Link href={`/todo/${id}`}>
            <h4 className="text-lg md:text-xl font-medium mb-2 text-gray-900 dark:text-gray-300 hover:cursor-pointer  hover:ring-2 hover:ring-blue-600">
              {title}
            </h4>
          </Link>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl text-[0px]">
          <img src={image} alt={title} />
        </div>
        <p className="text-gray-600 dark:text-gray-500 mb-3 text-left">
          {textSnippet}
        </p>
        <div className="flex flex-col">
          <p className="text-left text-gray-400 mb-4 ">{email}</p>
        </div>
      </div>
      <EditDeleteTodoButtons id={id} creatorId={creatorId} />
    </a>
  );
};
