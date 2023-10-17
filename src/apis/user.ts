import { apiRoutes, queryKeys } from "@/constants";
import { useDelete, useGet, usePost, useUpdate } from "./generic";

export interface User {
  id?: number;
  name: string;
}

export const useGetUser = (id: number) => {
  return useGet<User>(queryKeys.USER, apiRoutes.USER, { id });
};

export const useGetUsers = () => {
  return useGet<User[]>(queryKeys.USER, apiRoutes.USER);
};

export const usePostUser = () => {
  return usePost<User[], User>(
    queryKeys.USER,
    apiRoutes.USER,
    undefined,
    undefined,
    (old, data) => {
      return [...old, data];
    }
  );
};

export const useUpdateUser = () => {
  return useUpdate<User[], User>(
    queryKeys.USER,
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
    queryKeys.USER,
    apiRoutes.USER,
    undefined,
    undefined,
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};
