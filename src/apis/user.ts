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
  useUpdateInList,
} from "./hooks";
import {
  CursorQueryParams,
  PageQueryParams,
  PageQueryResponse,
  Scheme,
} from "./types";

export interface User extends Scheme {
  name: string;
  email: string;
  phone: string;
  profile?: string;
  approved: boolean;
}

export type UserCreate = Omit<User, "approved" | keyof Scheme>;

export type UserUpdate = Omit<User, "approved" | "createdAt" | "updatedAt">;

export interface UserApprove {
  id: number;
}

const useInvalidateUser = (params?: object) => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries([toUrl(ApiRoutes.User), params]);
};

// [GET] /api/users/{id}
export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }));
};

// [GET] /api/users?page=1&limit=10
export const useGetUsersByPage = (params: PageQueryParams) => {
  return useGetPage<User[]>(toUrl(ApiRoutes.User), params);
};

// [GET] /api/users?limit=10
export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(toUrl(ApiRoutes.User), params);
};

// [POST] /api/users

export const useCreateUser = (params?: object) => {
  return usePost<User[] | PageQueryResponse<User[]>, UserCreate>(
    toUrl(ApiRoutes.User),
    params
  );
};

const updateUser = (user: User, update: UserUpdate) => {
  return {
    ...user,
    name: update.name,
    email: update.email,
    phone: update.phone,
    updatedAt: new Date().toISOString(),
  };
};

// [PUT] /api/users/{id}
export const useUpdateUser = (id: number) => {
  return useUpdate<User, UserUpdate>(
    toUrl(ApiRoutes.User, { id }),
    undefined,
    undefined,
    (old, data) => updateUser(old, data)
  );
};

// [PUT] /api/users/{id}
export const useUpdateUserInList = (params?: object) => {
  return useUpdateInList<PageQueryResponse<User[]>, UserUpdate>(
    toUrl(ApiRoutes.User),
    params,
    undefined,
    (old, data) => ({
      ...old,
      data: cloneDeep(old.data).map((item) =>
        item.id === data.id ? updateUser(item, data) : item
      ),
    })
  );
};

// [DELETE] /api/users/{id}
export const useDeleteUser = (params?: object) => {
  return useDelete<PageQueryResponse<User[]>, number>(
    toUrl(ApiRoutes.User),
    params,
    undefined,
    (old, id) => ({
      ...old,
      data: old.data.filter((item) => item.id !== id),
    })
  );
};

// [POST] /api/users/{id}/approve
export const useApproveUser = (params?: object) => {
  return useCommand<PageQueryResponse<User[]>, UserApprove>(
    (data) => toUrl(ApiRoutes.ApproveUser, data),
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

// [POST] /api/users/test/{count}
export const useCreateTestUsers = (count: number) => {
  return usePost(`${toUrl(ApiRoutes.User)}/test/${count}`, undefined, {
    onSuccess: useInvalidateUser(),
  });
};

// [POST] /api/users/test/reset
export const useResetTestUsers = () => {
  return usePost(`${toUrl(ApiRoutes.User)}/test/reset`, undefined, {
    onSuccess: useInvalidateUser(),
  });
};
