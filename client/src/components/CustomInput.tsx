import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
}

export const CustomInput: React.FC<Props> = ({ ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <>
      <input className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" {...field} {...props} id={field.name} />
      {error && (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {error}
          </div>
        </div>
      )}
    </>
  );
};
