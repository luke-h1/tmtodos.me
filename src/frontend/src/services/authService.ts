import axios from 'axios';

const authService = {
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<{
    errors?: [{ message: string }];
    data: {
      token: string;
      user: {
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  }> => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
    return res.data;
  },

  login: async (
    email: string,
    password: string,
  ): Promise<{
    errors?: [{ message: string }];
    data: {
      token: string;
      user: {
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  }> => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        email,
        password,
      },
    );
    return res.data;
  },
};
export default authService;
