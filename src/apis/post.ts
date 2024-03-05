import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import {
  CursorQueryParams,
  PageQueryParams,
  Scheme,
  User,
  useDelete,
  useFetch,
  useGetPage,
  useInvalidate,
  useLoadMore,
  usePost,
  useUpdate,
} from ".";

export interface Post extends Scheme {
  userId: number;
  user: Nullable<User>;
  title: string;
  content: string;
}

export type PostCreate = Omit<Post, "user" | keyof Scheme>;

export type PostUpdate = Omit<Post, "user" | "createdAt" | "updatedAt">;

// [GET] /api/posts/{id}
export const useGetPost = (id?: number) => {
  return useFetch<Post>(toUrl(ApiRoutes.Post, { id }));
};

// [GET] /api/posts?page=1&limit=10
export const useGetPostsByPage = (params: PageQueryParams) => {
  return useGetPage<Post[]>(toUrl(ApiRoutes.Post), params);
};

// [GET] /api/posts?limit=10
export const useGetPostsByCursor = (params: CursorQueryParams) => {
  return useLoadMore<Post[]>(toUrl(ApiRoutes.Post), params);
};

// [POST] /api/posts
export const useCreatePost = (params?: object) => {
  return usePost<Post[], PostCreate, number>(toUrl(ApiRoutes.Post), params);
};

// [PUT] /api/posts/{id}
export const useUpdatePost = (id: number) => {
  return useUpdate<Post, PostUpdate>(
    toUrl(ApiRoutes.Post, { id }),
    undefined,
    undefined,
    (old, data) => ({ ...old, ...data })
  );
};

// [DELETE] /api/posts/{id}
export const useDeletePost = () => {
  return useDelete<Post[], number>(
    toUrl(ApiRoutes.Post),
    undefined,
    undefined,
    (old, id) => old.filter((item) => item.id !== id)
  );
};

// [POST] /api/posts/test/{count}
export const useCreateTestPosts = (count: number) => {
  return usePost(`${toUrl(ApiRoutes.Post)}/test/${count}`, undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.Post)),
  });
};

// [DELETE] /api/posts/test/reset
export const useResetTestPosts = () => {
  return usePost(`${toUrl(ApiRoutes.Post)}/test/reset`, undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.Post)),
  });
};
