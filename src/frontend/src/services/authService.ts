import axios from 'axios';
import { User } from '../context/AuthContext';

const authService = {
  getToken: async (): Promise<{ token?: string }> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/token`,
    );
    return data;
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<{
    errors?: [{ message: string }];
    data: {
      token: string;
      user: User;
    };
  }> => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
    return data;
  },

  login: async (
    email: string,
    password: string,
  ): Promise<{
    errors?: [{ message: string }];
    data: {
      token: string;
      user: User;
    };
  }> => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        email,
        password,
      },
    );
    return data;
  },

  me: async (): Promise<{
    errors?: [{ message: string }];
    data: {
      token: string;
      user: User;
    };
  }> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/me`,
    );
    return data;
  },
};
export default authService;
