import gql from 'graphql-tag';
import * as Urql from 'urql';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createTodo: Todo;
  deleteTodo: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateTodo?: Maybe<Todo>;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationCreateTodoArgs = {
  input: TodoInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars['Int'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRegisterArgs = {
  image?: Maybe<Scalars['Upload']>;
  options: UsernamePasswordInput;
};

export type MutationUpdateTodoArgs = {
  id: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type PaginatedTodos = {
  __typename?: 'PaginatedTodos';
  hasMore: Scalars['Boolean'];
  todos: Array<Todo>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  todo?: Maybe<Todo>;
  todos: PaginatedTodos;
};

export type QueryTodoArgs = {
  id: Scalars['Int'];
};

export type QueryTodosArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TodoInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
};

export type TodoSnippetFragment = {
  __typename?: 'Todo';
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  textSnippet: string;
  creator: { __typename?: 'User'; id: number; email: string };
};

export type UserFragmentFragment = {
  __typename?: 'User';
  id: number;
  email: string;
  image: string;
};

export type UserResponseFragmentFragment = {
  __typename?: 'UserResponse';
  errors?: Maybe<
    Array<{ __typename?: 'FieldError'; field: string; message: string }>
  >;
  user?: Maybe<{
    __typename?: 'User';
    id: number;
    email: string;
    image: string;
  }>;
};

export type CreateTodoMutationVariables = Exact<{
  input: TodoInput;
}>;

export type CreateTodoMutation = {
  __typename?: 'Mutation';
  createTodo: {
    __typename?: 'Todo';
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    text: string;
    creatorId: number;
  };
};

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteTodoMutation = {
  __typename?: 'Mutation';
  deleteTodo: boolean;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{
      __typename?: 'User';
      id: number;
      email: string;
      image: string;
    }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
  image: Scalars['Upload'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{
      __typename?: 'User';
      id: number;
      email: string;
      image: string;
    }>;
  };
};

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;

export type UpdateTodoMutation = {
  __typename?: 'Mutation';
  updateTodo?: Maybe<{
    __typename?: 'Todo';
    id: number;
    title: string;
    text: string;
    textSnippet: string;
  }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{ __typename?: 'User'; id: number; email: string; image: string }>;
};

export type TodoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type TodoQuery = {
  __typename?: 'Query';
  todo?: Maybe<{
    __typename?: 'Todo';
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    text: string;
    creator: { __typename?: 'User'; id: number; email: string };
  }>;
};

export type TodosQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;

export type TodosQuery = {
  __typename?: 'Query';
  todos: {
    __typename?: 'PaginatedTodos';
    hasMore: boolean;
    todos: Array<{
      __typename?: 'Todo';
      id: number;
      createdAt: string;
      updatedAt: string;
      title: string;
      textSnippet: string;
      creator: { __typename?: 'User'; id: number; email: string };
    }>;
  };
};

export const TodoSnippetFragmentDoc = gql`
  fragment TodoSnippet on Todo {
    id
    createdAt
    updatedAt
    title
    textSnippet
    creator {
      id
      email
    }
  }
`;
export const ErrorFragmentDoc = gql`
  fragment Error on FieldError {
    field
    message
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    email
    image
  }
`;
export const UserResponseFragmentFragmentDoc = gql`
  fragment UserResponseFragment on UserResponse {
    errors {
      ...Error
    }
    user {
      ...UserFragment
    }
  }
  ${ErrorFragmentDoc}
  ${UserFragmentFragmentDoc}
`;
export const CreateTodoDocument = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      id
      createdAt
      updatedAt
      title
      text
      creatorId
    }
  }
`;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(
    CreateTodoDocument,
  );
}
export const DeleteTodoDocument = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(
    DeleteTodoDocument,
  );
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!, $image: Upload!) {
    register(options: $options, image: $image) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
  );
}
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($id: Int!, $title: String!, $text: String!) {
    updateTodo(id: $id, title: $title, text: $text) {
      id
      title
      text
      textSnippet
    }
  }
`;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const TodoDocument = gql`
  query Todo($id: Int!) {
    todo(id: $id) {
      id
      createdAt
      updatedAt
      title
      text
      creator {
        id
        email
      }
    }
  }
`;

export function useTodoQuery(
  options: Omit<Urql.UseQueryArgs<TodoQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<TodoQuery>({ query: TodoDocument, ...options });
}
export const TodosDocument = gql`
  query Todos($limit: Int!, $cursor: String) {
    todos(limit: $limit, cursor: $cursor) {
      hasMore
      todos {
        ...TodoSnippet
      }
    }
  }
  ${TodoSnippetFragmentDoc}
`;

export function useTodosQuery(
  options: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<TodosQuery>({ query: TodosDocument, ...options });
}
