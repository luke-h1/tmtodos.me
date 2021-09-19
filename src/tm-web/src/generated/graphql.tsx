import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  createTodo: Todo;
  updateTodo?: Maybe<Todo>;
  deleteTodo: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateTodoArgs = {
  image?: Maybe<Scalars['Upload']>;
  input: TodoInput;
};


export type MutationUpdateTodoArgs = {
  image?: Maybe<Scalars['Upload']>;
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  image?: Maybe<Scalars['Upload']>;
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type PaginatedTodos = {
  __typename?: 'PaginatedTodos';
  todos: Array<Todo>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  todos: PaginatedTodos;
  todo?: Maybe<Todo>;
  me?: Maybe<User>;
};


export type QueryTodosArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryTodoArgs = {
  id: Scalars['Int'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  creatorId: Scalars['Float'];
  image: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
  creator: User;
};

export type TodoInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  image: Scalars['String'];
  createdAt: Scalars['String'];
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

export type ErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type TodoSnippetFragment = (
  { __typename?: 'Todo' }
  & Pick<Todo, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'textSnippet'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'image'>
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type CreateTodoMutationVariables = Exact<{
  input: TodoInput;
  image: Scalars['Upload'];
}>;


export type CreateTodoMutation = (
  { __typename?: 'Mutation' }
  & { createTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'image' | 'creatorId'>
  ) }
);

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTodo'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
  image: Scalars['Upload'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'text' | 'image' | 'textSnippet'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type TodoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TodoQuery = (
  { __typename?: 'Query' }
  & { todo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  )> }
);

export type TodosQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: (
    { __typename?: 'PaginatedTodos' }
    & Pick<PaginatedTodos, 'hasMore'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & TodoSnippetFragment
    )> }
  ) }
);

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
${UserFragmentFragmentDoc}`;
export const CreateTodoDocument = gql`
    mutation CreateTodo($input: TodoInput!, $image: Upload!) {
  createTodo(input: $input, image: $image) {
    id
    createdAt
    updatedAt
    title
    text
    image
    creatorId
  }
}
    `;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument);
};
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: Int!) {
  deleteTodo(id: $id)
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!, $image: Upload!) {
  register(options: $options, image: $image) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: Int!, $title: String!, $text: String!, $image: Upload!) {
  updateTodo(id: $id, title: $title, text: $text, image: $image) {
    id
    title
    text
    image
    textSnippet
  }
}
    `;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
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

export function useTodoQuery(options: Omit<Urql.UseQueryArgs<TodoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodoQuery>({ query: TodoDocument, ...options });
};
export const TodosDocument = gql`
    query Todos($limit: Int!, $cursor: String) {
  todos(limit: $limit, cursor: $cursor) {
    hasMore
    todos {
      ...TodoSnippet
    }
  }
}
    ${TodoSnippetFragmentDoc}`;

export function useTodosQuery(options: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodosQuery>({ query: TodosDocument, ...options });
};