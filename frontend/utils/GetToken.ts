import { useContext } from 'react';
import AuthContext from 'context/auth/authContext';

const getToken = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { token } = user;
  return token;
};

export default getToken;
