import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
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
  OffsetQueryData,
  OffsetQueryParams,
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
  params: Pick<OffsetQueryParams, "sort" | "order">
) => {
  return useFetch<User[]>(toUrl(ApiRoutes.User), params);
};

export const useGetUsersByOffset = (params: OffsetQueryParams) => {
  return useGetPage<User[]>(toUrl(ApiRoutes.User), params);
};

export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(toUrl(ApiRoutes.User), params);
};

export type UserCreate = Pick<User, "name" | "email" | "phone" | "profile">;

export const useCreateUser = (
  params?: OffsetQueryParams | CursorQueryParams
) => {
  return usePost<User[], UserCreate>(
    toUrl(ApiRoutes.User),
    params,
    {
      meta: { successMessage: "User created successfully" },
    },
    (old, data) => {
      const newUser = { id: 0, approved: false, ...data };
      return [...old, newUser];
    }
  );
};

export type UserUpdate = Omit<User, "approved">;

export const useUpdateUser = () => {
  return useUpdate<User[], UserUpdate>(
    toUrl(ApiRoutes.User),
    undefined,
    {
      meta: { successMessage: "User updated successfully" },
    },
    (old, data) => {
      const finded = old.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.name = data.name;
      finded.email = data.email;
      finded.phone = data.phone;
      return old.map((item) => (item.id === data.id ? finded : item));
    }
  );
};

export const useDeleteUser = (params?: object) => {
  return useDelete<User[] | OffsetQueryData<User[]>, number>(
    toUrl(ApiRoutes.User),
    params,
    {
      meta: { successMessage: "User deleted successfully" },
    },
    (old, id) => {
      const newData = "data" in old ? old.data : old;
      if (!Array.isArray(old)) {
        return {
          ...old,
          data: newData.filter((item) => item.id !== id),
        };
      } else {
        return newData.filter((item) => item.id !== id);
      }
    }
  );
};

export interface UserApprove {
  id: number;
}

export const useApproveUser = (params?: object) => {
  return useCommand<User[] | OffsetQueryData<User[]>, UserApprove>(
    ApiRoutes.ApproveUser,
    {
      meta: { successMessage: "User approved successfully" },
    },
    [toUrl(ApiRoutes.User), params],
    (old, data) => {
      const newData = "data" in old ? old.data : old;
      const finded = newData.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.approved = true;
      if (!Array.isArray(old)) {
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
