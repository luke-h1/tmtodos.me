import axios from 'axios';
import { Todo } from '../context/AuthContext';

const todoService = {
  create: async (
    body: string,
    title: string,
    completed: boolean,
  ): Promise<{ errors?: string; data: { todo: Todo } }> => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/todo`,
      {
        body,
        title,
        completed,
      },
    );
    return data;
  },
  update: async (
    id: number,
    body?: string,
    title?: string,
    completed?: boolean,
  ) => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/todo/${id}`,
      {
        body,
        title,
        completed,
      },
    );
    return data;
  },
  getTodos: async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/todo`,
    );
    return data;
  },
  getTodo: async (id: string) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/todo/${id}`,
    );
    return data;
  },
};
export default todoService;
