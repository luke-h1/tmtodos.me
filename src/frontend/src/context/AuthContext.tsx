import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import authService from '../services/authService';
import { Todo } from './TodoContext';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  todos: Todo[];
  loading: boolean;
  createdAt: string;
  updatedAt: string;
}

interface State {
  ready: boolean;
  user?: User;
}
interface AuthContextState {
  user?: User;
  error?: string;
  loading: boolean;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState | undefined>(
  undefined,
);

interface Props {
  children?: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({ ready: false });
  const [token, setToken] = useState<string | undefined>(undefined);

  if (typeof token !== 'undefined') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const { data } = await authService.register(
      firstName,
      lastName,
      email,
      password,
    );

    if (data && data.user) {
      setState({
        ready: true,
        user: data.user,
      });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await authService.login(email, password);

    if (data && data.user) {
      setState({
        ready: true,
        user: data.user,
      });
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setToken(data.token);
    } else {
      setState({
        user: undefined,
        ready: true,
      });
    }
  };

  const logout = async (): Promise<void> => {
    setToken(undefined);
    axios.defaults.headers.common['Authorization'] = '';
    setState({
      user: undefined,
      ready: true,
    });
  };
  const fetchUser = async () => {
    const data = await authService.me();
    if (data.data.token && data.data.user) {
      setToken(data.data.token);
      setState({
        user: data.data.user,
        ready: true,
      });
    } else {
      setState({ user: undefined, ready: true });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setState({
        user: undefined,
        ready: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const contextState: AuthContextState = useMemo(() => {
    return {
      user: state.user ?? undefined,
      loading: state?.user?.loading as boolean,
      state,
      setState,
      register,
      login,
      logout,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  return (
    state.ready && (
      <AuthContext.Provider value={contextState}>
        {children}
      </AuthContext.Provider>
    )
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
}
