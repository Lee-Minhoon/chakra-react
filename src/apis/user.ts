import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { cloneDeep } from "lodash-es";
import {
  useCommand,
  useDelete,
  useFetch,
  useGetPage,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";
import {
  CursorQueryParams,
  PageQueryData,
  PageQueryParams,
  Scheme,
} from "./types";

export interface User extends Scheme {
  name: string;
  email: string;
  phone: string;
  profile?: string;
  approved: boolean;
}

export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }));
};

export const useGetUsers = (
  params: Pick<PageQueryParams, "sort" | "order">
) => {
  return useFetch<User[]>(toUrl(ApiRoutes.User), params);
};

export const useGetUsersByPage = (params: PageQueryParams) => {
  return useGetPage<User[]>(toUrl(ApiRoutes.User), params);
};

export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(toUrl(ApiRoutes.User), params);
};

export type UserCreate = Pick<User, "name" | "email" | "phone" | "profile">;

export const useCreateUser = (params?: object) => {
  return usePost<User[] | PageQueryData<User[]>, UserCreate>(
    toUrl(ApiRoutes.User),
    params,
    {
      meta: { successMessage: "User created successfully" },
    }
  );
};

export type UserUpdate = Omit<User, "approved" | "createdAt" | "updatedAt">;

export const useUpdateUser = (params?: object) => {
  return useUpdate<User[] | PageQueryData<User[]>, UserUpdate>(
    toUrl(ApiRoutes.User),
    params,
    {
      meta: { successMessage: "User updated successfully" },
    },
    (old, data) => {
      const isPaginatation = "data" in old;
      const newData = cloneDeep(isPaginatation ? old.data : old);
      const finded = newData.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.name = data.name;
      finded.email = data.email;
      finded.phone = data.phone;
      finded.updatedAt = new Date().toISOString();
      if (isPaginatation) {
        return {
          ...old,
          data: newData.map((item) => (item.id === data.id ? finded : item)),
        };
      }
      return newData.map((item) => (item.id === data.id ? finded : item));
    }
  );
};

export const useDeleteUser = (params?: object) => {
  return useDelete<User[] | PageQueryData<User[]>, number>(
    toUrl(ApiRoutes.User),
    params,
    {
      meta: { successMessage: "User deleted successfully" },
    },
    (old, id) => {
      const isPaginatation = "data" in old;
      const newData = isPaginatation ? old.data : old;
      if (isPaginatation) {
        return {
          ...old,
          data: newData.filter((item) => item.id !== id),
        };
      }
      return newData.filter((item) => item.id !== id);
    }
  );
};

export interface UserApprove {
  id: number;
}

export const useApproveUser = (params?: object) => {
  return useCommand<User[] | PageQueryData<User[]>, UserApprove>(
    ApiRoutes.ApproveUser,
    [toUrl(ApiRoutes.User), params],
    {
      meta: { successMessage: "User approved successfully" },
    },
    (old, data) => {
      const isPaginatation = "data" in old;
      const newData = cloneDeep(isPaginatation ? old.data : old);
      const finded = newData.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.approved = true;
      finded.updatedAt = new Date().toISOString();
      if (isPaginatation) {
        return {
          ...old,
          data: old.data.map((item) => (item.id === data.id ? finded : item)),
        };
      }
      return newData.map((item) => (item.id === data.id ? finded : item));
    }
  );
};

const useInvalidate = () => {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.invalidateQueries([toUrl(ApiRoutes.User)]);
  };
};

export const useCreateTestUsers = (count: number) => {
  const invalidate = useInvalidate();

  return usePost(`${toUrl(ApiRoutes.User)}/test/${count}`, undefined, {
    onSuccess: invalidate,
    meta: { successMessage: "Test users created successfully" },
  });
};

export const useResetTestUsers = () => {
  const invalidate = useInvalidate();

  return usePost(`${toUrl(ApiRoutes.User)}/test/reset`, undefined, {
    onSuccess: invalidate,
    meta: { successMessage: "Test users reset successfully" },
  });
};
