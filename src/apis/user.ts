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
  PageQueryResponse,
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
  return usePost<User[] | PageQueryResponse<User[]>, UserCreate>(
    toUrl(ApiRoutes.User),
    params
  );
};

export type UserUpdate = Omit<User, "approved" | "createdAt" | "updatedAt">;

const updateUser = (user: User, update: UserUpdate) => {
  return {
    ...user,
    name: update.name,
    email: update.email,
    phone: update.phone,
    updatedAt: new Date().toISOString(),
  };
};

export const useUpdateUser = (params?: object) => {
  return useUpdate<PageQueryResponse<User[]>, UserUpdate>(
    toUrl(ApiRoutes.User),
    params,
    undefined,
    (old, data) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item) =>
          item.id === data.id ? updateUser(item, data) : item
        ),
      };
    }
  );
};

export const useDeleteUser = (params?: object) => {
  return useDelete<PageQueryResponse<User[]>, number>(
    toUrl(ApiRoutes.User),
    params,
    undefined,
    (old, id) => {
      return {
        ...old,
        data: old.data.filter((item) => item.id !== id),
      };
    }
  );
};

export interface UserApprove {
  id: number;
}

export const useApproveUser = (params?: object) => {
  return useCommand<PageQueryResponse<User[]>, UserApprove>(
    ApiRoutes.ApproveUser,
    [toUrl(ApiRoutes.User), params],
    undefined,
    (old, data) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              approved: true,
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        }),
      };
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
  });
};

export const useResetTestUsers = () => {
  const invalidate = useInvalidate();

  return usePost(`${toUrl(ApiRoutes.User)}/test/reset`, undefined, {
    onSuccess: invalidate,
  });
};
