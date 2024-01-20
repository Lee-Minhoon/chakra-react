import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { CursorQueryParams, PageQueryParams, Scheme, User } from ".";
import {
  useDelete,
  useFetch,
  useGetPage,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";

export interface Post extends Scheme {
  userId: number;
  user: Nullable<User>;
  title: string;
  content: string;
}

export const useGetPost = (id?: number) => {
  return useFetch<Post>(toUrl(ApiRoutes.Post, { id }));
};

export const useGetPostsByPage = (params: PageQueryParams) => {
  return useGetPage<Post[]>(toUrl(ApiRoutes.Post), params);
};

export const useGetPostsByCursor = (params: CursorQueryParams) => {
  return useLoadMore<Post[]>(toUrl(ApiRoutes.Post), params);
};

export type PostCreate = Omit<Post, "user" | keyof Scheme>;

export const useCreatePost = (params?: PageQueryParams | CursorQueryParams) => {
  return usePost<Post[], PostCreate, number>(toUrl(ApiRoutes.Post), params);
};

export type PostUpdate = Omit<Post, "createdAt" | "updatedAt">;

export const useUpdatePost = (id: number) => {
  return useUpdate<Post, PostUpdate>(
    toUrl(ApiRoutes.Post, { id }),
    undefined,
    undefined,
    (old, data) => ({ ...old, ...data })
  );
};

export const useDeletePost = () => {
  return useDelete<Post[], number>(
    toUrl(ApiRoutes.Post),
    undefined,
    undefined,
    (old, id) => old.filter((item) => item.id !== id)
  );
};

const useInvalidate = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries([toUrl(ApiRoutes.Post)]);
};

export const useCreateTestPosts = (count: number) => {
  const invalidate = useInvalidate();

  return usePost(`${toUrl(ApiRoutes.Post)}/test/${count}`, undefined, {
    onSuccess: invalidate,
  });
};

export const useResetTestPosts = () => {
  const invalidate = useInvalidate();

  return usePost(`${toUrl(ApiRoutes.Post)}/test/reset`, undefined, {
    onSuccess: invalidate,
  });
};
