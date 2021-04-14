import Link from 'next/link';
import React from 'react';

interface TodoItemProps {
title: string;
textSnippet: string;
email: string;
id: number;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  title, textSnippet, email, id,
}) => {
  return (
    <Link href={`/todo/${id}`}>
      <a className="p-2 w-full" key={id}>
        <div className="mb-3 border-gray-800 ring-gray-800 ">
          <div className="flex flex-col md:flex-row justify-left">
            <h4 className="text-lg md:text-xl font-medium mb-2 text-gray-900 dark:text-gray-300">
              {title}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-500 mb-3 text-left">
            {textSnippet}
          </p>
          <div className="flex flex-col">
            <p className="text-left text-gray-400 mb-4 ">
              {email}
            </p>
          </div>
        </div>

      </a>
    </Link>

  );
};
