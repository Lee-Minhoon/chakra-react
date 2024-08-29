import { ApiRoutes } from "@/constants";
import { toPath } from "@/utils";
import { cloneDeep } from "lodash-es";
import {
  CursorQueryParams,
  PageQueryParams,
  PageQueryResponse,
  Scheme,
  useCommand,
  useDelete,
  useFetch,
  useGetPage,
  useInvalidateQueries,
  useLoadMore,
  usePost,
  useUpdate,
  useUpdateInList,
} from "..";

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

// [GET] /api/users/{id}
export const useGetUser = (id?: number) => {
  return useFetch<User>(toPath(ApiRoutes.User, { id }));
};

// [GET] /api/users?page=1&limit=10
export const useGetUsersByPage = (params: PageQueryParams) => {
  return useGetPage<User>(toPath(ApiRoutes.User), params);
};

// [GET] /api/users?limit=10
export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User>(toPath(ApiRoutes.User), params);
};

// [POST] /api/users
export const useCreateUser = (params?: object) => {
  return usePost<PageQueryResponse<User>, UserCreate, number>(
    toPath(ApiRoutes.User),
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
    toPath(ApiRoutes.User, { id }),
    undefined,
    undefined,
    (old, data) => updateUser(old, data)
  );
};

// [PUT] /api/users/{id}
export const useUpdateUserInList = (params?: object) => {
  return useUpdateInList<PageQueryResponse<User>, UserUpdate>(
    toPath(ApiRoutes.User),
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
  return useDelete<PageQueryResponse<User>, number>(
    toPath(ApiRoutes.User),
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
  return useCommand<PageQueryResponse<User>, UserApprove>(
    (data) => toPath(ApiRoutes.ApproveUser, data),
    [toPath(ApiRoutes.User), params],
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
  return usePost(`${toPath(ApiRoutes.CreateTestUsers, { count })}`, undefined, {
    onSuccess: useInvalidateQueries(toPath(ApiRoutes.User)),
  });
};

// [POST] /api/users/test/reset
export const useResetTestUsers = () => {
  return usePost(`${toPath(ApiRoutes.User)}/test/reset`, undefined, {
    onSuccess: useInvalidateQueries(toPath(ApiRoutes.User)),
  });
};
