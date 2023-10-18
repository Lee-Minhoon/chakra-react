import { apiRoutes } from "@/constants";
import { useDelete, useGet, usePost, useUpdate } from "./generic";

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
  return useGet<User[]>(apiRoutes.USER);
};

export const usePostUser = () => {
  return usePost<User[], User>(
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
