import { useTodoQuery } from '@src/generated/graphql';
import { useGetIntId } from './useGetIntId';

export const useGetTodoFromUrl = () => {
  const intId = useGetIntId();
  return useTodoQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
