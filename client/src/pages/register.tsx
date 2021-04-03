import { useRouter } from 'next/dist/client/router';
import React from 'react';

interface registerProps {

}

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  return (
    <>
      <h1>register</h1>
    </>
  );
};
export default register;
