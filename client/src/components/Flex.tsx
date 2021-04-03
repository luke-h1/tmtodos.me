import React from 'react';

export const Flex: React.FC<{}> = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col align-center items-center place-items-center py-10">
      {children}
    </div>
  );
};
