import React from 'react';

export const Spinner: React.FC<{}> = () => {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900" />
    </div>
  );
};
