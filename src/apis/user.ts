import { ApiRoutes } from "@/constants";
import { useModalStore } from "@/stores";
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
  approved: boolean;
}

export const useGetUser = (id: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }));
};

export const useGetUsers = () => {
  return useFetch<User[]>(toUrl(ApiRoutes.User));
};

export const useGetUsersByOffset = (params: OffsetQueryParams) => {
  return useGetPage<User[]>(toUrl(ApiRoutes.User), params);
};

export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(toUrl(ApiRoutes.User), params);
};

export interface UserCreate {
  name: string;
  email: string;
  phone: string;
}

export const useCreateUser = (
  params?: OffsetQueryParams | CursorQueryParams
) => {
  const { openAlert } = useModalStore(["openAlert"]);

  return usePost<User[], UserCreate>(
    toUrl(ApiRoutes.User),
    params,
    {
      onSuccess: () =>
        openAlert({
          title: "User created",
          content: "User created successfully",
        }),
    },
    (old, data) => {
      const newUser = { id: 0, approved: false, ...data };
      return [...old, newUser];
    }
  );
};

export type UserUpdate = Omit<User, "approved">;

export const useUpdateUser = () => {
  const { openAlert } = useModalStore(["openAlert"]);

  return useUpdate<User[], UserUpdate>(
    toUrl(ApiRoutes.User),
    undefined,
    {
      onSuccess: () =>
        openAlert({
          title: "User updated",
          content: "User updated successfully",
        }),
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
  const { openAlert } = useModalStore(["openAlert"]);

  return useDelete<User[] | OffsetQueryData<User[]>, number>(
    toUrl(ApiRoutes.User),
    params,
    {
      onSuccess: () =>
        openAlert({
          title: "User deleted",
          content: "User deleted successfully",
        }),
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
  const { openAlert } = useModalStore(["openAlert"]);

  return useCommand<User[] | OffsetQueryData<User[]>, UserApprove>(
    ApiRoutes.ApproveUser,
    {
      onSuccess: () =>
        openAlert({
          title: "User approved",
          content: "User approved successfully",
        }),
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
    return Promise.all(
      queryClient
        .getQueryCache()
        .findAll([toUrl(ApiRoutes.User)])
        .map((queryKey) => queryClient.invalidateQueries(queryKey))
    );
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
