import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toPath } from "@/utils";
import {
  CursorQueryParams,
  PageQueryParams,
  PageQueryResponse,
  Scheme,
  User,
  useDelete,
  useFetch,
  useGetPage,
  useInvalidateQueries,
  useLoadMore,
  usePost,
  useUpdate,
} from "..";

export interface Post extends Scheme {
  user: Nullable<User>;
  title: string;
  content: string;
}

export type PostCreate = Omit<Post, "user" | keyof Scheme>;

export type PostUpdate = Omit<Post, "user" | "createdAt" | "updatedAt">;

// [GET] /api/posts/{id}
export const useGetPost = (id?: number) => {
  return useFetch<Post>(toPath(ApiRoutes.Post, { id }));
};

// [GET] /api/posts?page=1&limit=10
export const useGetPostsByPage = (params: PageQueryParams) => {
  return useGetPage<Post>(toPath(ApiRoutes.Post), params);
};

// [GET] /api/posts?limit=10
export const useGetPostsByCursor = (params: CursorQueryParams) => {
  return useLoadMore<Post>(toPath(ApiRoutes.Post), params);
};

// [POST] /api/posts
export const useCreatePost = (params?: object) => {
  return usePost<PageQueryResponse<Post>, PostCreate, number>(
    toPath(ApiRoutes.Post),
    params
  );
};

// [PUT] /api/posts/{id}
export const useUpdatePost = (id: number) => {
  return useUpdate<Post, PostUpdate>(
    toPath(ApiRoutes.Post, { id }),
    undefined,
    undefined,
    (old, data) => ({ ...old, ...data })
  );
};

// [DELETE] /api/posts/{id}
export const useDeletePost = () => {
  return useDelete<Post[], number>(
    toPath(ApiRoutes.Post),
    undefined,
    undefined,
    (old, id) => old.filter((item) => item.id !== id)
  );
};

// [POST] /api/posts/test/{count}
export const useCreateTestPosts = (count: number) => {
  return usePost(`${toPath(ApiRoutes.Post)}/test/${count}`, undefined, {
    onSuccess: useInvalidateQueries(toPath(ApiRoutes.Post)),
  });
};

// [DELETE] /api/posts/test/reset
export const useResetTestPosts = () => {
  return usePost(`${toPath(ApiRoutes.Post)}/test/reset`, undefined, {
    onSuccess: useInvalidateQueries(toPath(ApiRoutes.Post)),
  });
};
