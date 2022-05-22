import axios from 'axios';
import { Todo } from '../context/TodoContext';

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
  ): Promise<Todo> => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/todo/${id}`,
      {
        body,
        title,
        completed,
      },
    );
    return data.data;
  },
  getTodos: async (): Promise<{ errors?: string; data: { todos: Todo[] } }> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/todo`,
    );
    return data;
  },
  getTodo: async (id: number): Promise<Todo> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/todo/${id}`,
    );
    return data.data;
  },
  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/todo/${id}`);
  },
};
export default todoService;
