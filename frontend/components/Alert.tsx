import React from 'react';

interface Iprops {
  children: string;
}

const Message: React.FC<Iprops> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col align-center justify-center items-center">
        <button type="button" className="text-center text-white $ max-w-xs rounded-md p-4 bg-red-500 mt-4 mb-4">
          {children}
        </button>
      </div>
    </>
  );
};
export default Message;
