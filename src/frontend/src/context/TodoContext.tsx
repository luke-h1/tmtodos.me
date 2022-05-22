import React, { createContext, useContext, useMemo, useState } from 'react';
import todoService from '../services/todoService';

export interface Todo {
  id: number;
  title: string;
  body: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface State {
  loading: boolean;
  ready: boolean;
  todos?: Todo[];
  todo?: Todo;
}

interface TodoContextState {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  createTodo: (
    title: string,
    body: string,
    completed: boolean,
  ) => Promise<Todo>;
  updateTodo: (
    id: number,
    title?: string,
    body?: string,
    completed?: boolean,
  ) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
  getTodos: () => Promise<Todo[]>;
  getTodo: (id: number) => Promise<Todo>;
}

export const TodoContext = createContext<TodoContextState | undefined>(
  undefined,
);

interface Props {
  children?: React.ReactNode;
}

export const TodoContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    ready: true,
    todos: [],
    todo: undefined,
    loading: false,
  });

  const getTodos = async (): Promise<Todo[]> => {
    const res = await todoService.getTodos();

    if (res.data.todos) {
      setState({
        ready: true,
        todos: res.data.todos,
        loading: false,
      });
    }
    return res.data.todos;
  };

  const getTodo = async (id: number): Promise<Todo> => {
    const todo = await todoService.getTodo(id);

    if (todo) {
      setState({
        ready: true,
        todo,
        todos: [...(state.todos as Todo[]), todo],
        loading: false,
      });
    }
    return todo;
  };

  const createTodo = async (
    title: string,
    body: string,
    completed: boolean,
  ): Promise<Todo> => {
    const res = await todoService.create(title, body, completed);

    setState({
      ready: true,
      todo: res.data.todo,
      todos: [],
      loading: false,
    });
    return res.data.todo;
  };

  const updateTodo = async (
    id: number,
    title?: string,
    body?: string,
    completed?: boolean,
  ): Promise<Todo> => {
    const todo = await todoService.update(id, title, body, completed);
    if (todo) {
      setState({
        ready: true,
        todos: [],
        todo,
        loading: false,
      });
    }
    return todo;
  };

  const deleteTodo = async (id: number) => {
    await todoService.deleteTodo(id);
    setState({
      ready: true,
      loading: false,
      todo: state.todo,
      todos: state.todos?.filter(todo => todo.id !== id),
    });
  };

  const contextState: TodoContextState = useMemo(() => {
    return {
      todo: state.todo,
      todos: state.todos,
      loading: state.loading,
      state,
      createTodo,
      deleteTodo,
      updateTodo,
      getTodo,
      getTodos,
      setState,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return !state.loading && state.ready ? (
    <TodoContext.Provider value={contextState}>{children}</TodoContext.Provider>
  ) : null;
};

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }

  return context;
}
