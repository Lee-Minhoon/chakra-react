import { useModalStore } from "@/stores";
import { useQueryClient } from "@tanstack/react-query";
import { toUrl } from ".";
import { apiRoutes, queryTypes } from "./constants";
import {
  useDelete,
  useGet,
  useGetPage,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";
import { CursorQueryParams, OffsetQueryParams } from "./types";

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

export const useGetUser = (id: number) => {
  return useGet<User>(toUrl(apiRoutes.USER, { id }));
};

export const useGetUsers = () => {
  return useGet<User[]>(toUrl(apiRoutes.USER), undefined, {
    meta: {
      type: queryTypes.ALL,
    },
  });
};

export const useGetUsersByOffset = (params: OffsetQueryParams) => {
  return useGetPage<User[]>(toUrl(apiRoutes.USER), params, {
    meta: {
      type: queryTypes.OFFSET,
    },
  });
};

export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(toUrl(apiRoutes.USER), params, {
    meta: {
      type: queryTypes.CURSOR,
    },
  });
};

const useInvalidate = () => {
  const queryClient = useQueryClient();

  return () => {
    return Promise.all(
      queryClient
        .getQueryCache()
        .findAll([toUrl(apiRoutes.USER)])
        .filter(
          (value) =>
            value.meta?.type === queryTypes.OFFSET ||
            value.meta?.type === queryTypes.CURSOR
        )
        .map((queryKey) => queryClient.invalidateQueries(queryKey))
    );
  };
};

export const usePostUser = () => {
  const invalidate = useInvalidate();

  return usePost<User[], User>(
    toUrl(apiRoutes.USER),
    undefined,
    {
      onSuccess: invalidate,
    },
    (old, data) => {
      return [...old, data];
    }
  );
};

export const useUpdateUser = () => {
  return useUpdate<User[], User>(
    toUrl(apiRoutes.USER),
    undefined,
    undefined,
    (old, data) => {
      return old.map((item) => (item.id === data.id ? data : item));
    }
  );
};

export const useDeleteUser = () => {
  const { openAlert } = useModalStore(["openAlert"]);
  const invalidate = useInvalidate();

  return useDelete<User[], number>(
    toUrl(apiRoutes.USER),
    undefined,
    {
      onSuccess: () => {
        invalidate().then(() =>
          openAlert({
            title: "User deleted",
            message: "User deleted successfully",
          })
        );
      },
    },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};

export const useCreateTestUsers = (count: number) => {
  const queryClient = useQueryClient();

  const queryKeys = queryClient
    .getQueryCache()
    .findAll([toUrl(apiRoutes.USER)]);

  return usePost(`${toUrl(apiRoutes.USER)}/test/${count}`, undefined, {
    onSuccess: () =>
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries(queryKey)),
  });
};

export const useResetTestUsers = (count: number) => {
  const queryClient = useQueryClient();

  const queryKeys = queryClient
    .getQueryCache()
    .findAll([toUrl(apiRoutes.USER)]);

  return usePost(`${toUrl(apiRoutes.USER)}/test/reset`, undefined, {
    onSuccess: () =>
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries(queryKey)),
  });
};
