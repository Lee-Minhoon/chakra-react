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

export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }));
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

export const useUpdateUser = (id: number) => {
  return useUpdate<User, UserUpdate>(
    toUrl(ApiRoutes.User, { id }),
    undefined,
    undefined,
    (old, data) => updateUser(old, data)
  );
};

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

export interface UserApprove {
  id: number;
}

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

const useInvalidate = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries([toUrl(ApiRoutes.User)]);
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
