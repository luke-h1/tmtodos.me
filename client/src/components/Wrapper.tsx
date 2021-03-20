import React from 'react';

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="w-6/12 mx-0 mx-auto flex flex-col text-center m-4">
      {children}
    </div>
  );
};
