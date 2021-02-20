import React from 'react';

interface Iprops {
  children: string;
}

const Loader: React.FC<Iprops> = () => {
  return (
    <>
      <div className="flex flex-col align-center justify-center items-center">
        <div className="w-12 h-12 border-4 m-4  border-green-400 rounded-full loader" />
      </div>
    </>
  );
};
export default Loader;
