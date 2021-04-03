/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<Props> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <div className="max-w-lg w-full">
      <label
        className="block text-gray-500 font-bold text-left mb-3 md:mb-0 pr-4"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        {...field}
        {...props}
        id={field.name}
      />
      {error && (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};
