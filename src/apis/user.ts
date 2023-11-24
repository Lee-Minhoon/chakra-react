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
import { CursorQueryParams, OffsetQueryParams } from "./types";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  approved: boolean;
}

export const useGetUser = (id: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }));
};

export const useGetUsers = () => {
  return useFetch<User[]>(toUrl(ApiRoutes.User), undefined);
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
          message: "User created successfully",
        }),
    },
    (old, data) => {
      const newUser = { id: 0, approved: false, ...data };
      return [...old, newUser];
    }
  );
};

export interface UserUpdate {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const useUpdateUser = () => {
  const { openAlert } = useModalStore(["openAlert"]);

  return useUpdate<User[], UserUpdate>(
    toUrl(ApiRoutes.User),
    undefined,
    {
      onSuccess: () =>
        openAlert({
          title: "User updated",
          message: "User updated successfully",
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

export const useDeleteUser = () => {
  const { openAlert } = useModalStore(["openAlert"]);

  return useDelete<User[], number>(
    toUrl(ApiRoutes.User),
    undefined,
    {
      onSuccess: () =>
        openAlert({
          title: "User deleted",
          message: "User deleted successfully",
        }),
    },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};

export interface UserApprove {
  id: number;
}

export const useApproveUser = () => {
  const { openAlert } = useModalStore(["openAlert"]);
  const invalidate = useInvalidate();

  return useCommand<User[], UserApprove>(
    ApiRoutes.ApproveUser,
    undefined,
    {
      onSuccess: () =>
        invalidate().then(() =>
          openAlert({
            title: "User approved",
            message: "User approved successfully",
          })
        ),
    },
    (old, data) => {
      const finded = old.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.approved = true;
      return old.map((item) => (item.id === data.id ? finded : item));
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
