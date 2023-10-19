import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes, queryTypes } from "./constants";
import {
  useDelete,
  useGet,
  useGetPage,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";
import { CursorQueryParams, OffsetQueryParams } from "./types";

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

export const useGetUser = (id: number) => {
  return useGet<User>(apiRoutes.USER, { id });
};

export const useGetUsers = () => {
  return useGet<User[]>(apiRoutes.USER, undefined, {
    meta: {
      type: queryTypes.ALL,
    },
  });
};

export const useGetUsersByOffset = (params: OffsetQueryParams) => {
  return useGetPage<User[]>(apiRoutes.USER, params, {
    meta: {
      type: queryTypes.OFFSET,
    },
  });
};

export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(apiRoutes.USER, params, {
    meta: {
      type: queryTypes.CURSOR,
    },
  });
};

export const usePostUser = () => {
  const queryClient = useQueryClient();

  const queryKeys = queryClient
    .getQueryCache()
    .findAll([apiRoutes.USER])
    .filter(
      (value) =>
        value.meta?.type === queryTypes.OFFSET ||
        value.meta?.type === queryTypes.CURSOR
    );

  return usePost<User[], User>(
    apiRoutes.USER,
    undefined,
    {
      onSuccess: () =>
        queryKeys.forEach((queryKey) =>
          queryClient.invalidateQueries(queryKey)
        ),
    },
    (old, data) => {
      return [...old, data];
    }
  );
};

export const useUpdateUser = () => {
  return useUpdate<User[], User>(
    apiRoutes.USER,
    undefined,
    undefined,
    (old, data) => {
      return old.map((item) => (item.id === data.id ? data : item));
    }
  );
};

export const useDeleteUser = () => {
  return useDelete<User[], number>(
    apiRoutes.USER,
    undefined,
    undefined,
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};

export const useCreateTestUsers = (count: number) => {
  const queryClient = useQueryClient();

  const queryKeys = queryClient.getQueryCache().findAll([apiRoutes.USER]);

  return usePost(`${apiRoutes.USER}/test/${count}`, undefined, {
    onSuccess: () =>
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries(queryKey)),
  });
};
