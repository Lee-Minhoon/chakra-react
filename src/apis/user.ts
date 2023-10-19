import { apiRoutes, queryType } from "./constants";
import {
  useDelete,
  useGet,
  useInvalidate,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";
import { CursorQueryParams, PageQueryParams } from "./types";

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
      type: queryType.ALL,
    },
  });
};

export const useGetUsersByOffset = (params: PageQueryParams) => {
  return useGet<User[]>(apiRoutes.USER, params, {
    meta: {
      type: queryType.OFFSET,
    },
    keepPreviousData: true,
  });
};

export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(apiRoutes.USER, params, {
    meta: {
      type: queryType.CURSOR,
    },
  });
};

export const usePostUser = () => {
  const { callback } = useInvalidate(apiRoutes.USER, queryType.OFFSET);

  return usePost<User[], User>(
    apiRoutes.USER,
    undefined,
    { onSuccess: callback },
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
