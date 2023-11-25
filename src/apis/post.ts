import { ApiRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { CursorQueryParams, OffsetQueryParams, Scheme } from ".";
import {
  useDelete,
  useFetch,
  useGetPage,
  useLoadMore,
  usePost,
  useUpdate,
} from "./hooks";

export interface Post extends Scheme {
  title: string;
  content: string;
}

export const useGetPost = (id: number) => {
  return useFetch<Post>(toUrl(ApiRoutes.Post), { id });
};

export const useGetPosts = (enabled: boolean) => {
  return useFetch<Post[]>(toUrl(ApiRoutes.Post), undefined, { enabled });
};

export const useGetPostsByOffset = (
  params: OffsetQueryParams,
  enabled: boolean
) => {
  return useGetPage<Post[]>(toUrl(ApiRoutes.Post), params, { enabled });
};

export const useGetPostsByCursor = (
  params: CursorQueryParams,
  enabled: boolean
) => {
  return useLoadMore<Post[]>(toUrl(ApiRoutes.Post), params, { enabled });
};

export interface PostCreate {
  title: string;
  content: string;
}

export const useCreatePost = (
  params?: OffsetQueryParams | CursorQueryParams
) => {
  const { openAlert } = useModalStore(["openAlert"]);

  return usePost<Post[], PostCreate>(
    toUrl(ApiRoutes.Post),
    params,
    {
      onSuccess: () =>
        openAlert({
          title: "Post created",
          content: "Post created successfully",
        }),
    },
    (old, data) => {
      const newPost = { id: 0, ...data };
      return [...old, newPost];
    }
  );
};

export type PostUpdate = Post;

export const useUpdatePost = () => {
  const { openAlert } = useModalStore(["openAlert"]);

  return useUpdate<Post[], PostUpdate>(
    toUrl(ApiRoutes.Post),
    undefined,
    {
      onSuccess: () =>
        openAlert({
          title: "Post updated",
          content: "Post updated successfully",
        }),
    },
    (old, data) => {
      const finded = old.find((item) => item.id === data.id);
      if (!finded) return old;
      finded.title = data.title;
      finded.content = data.content;
      return old.map((item) => (item.id === data.id ? finded : item));
    }
  );
};

export const useDeletePost = () => {
  const { openAlert } = useModalStore(["openAlert"]);

  return useDelete<Post[], number>(
    toUrl(ApiRoutes.Post),
    undefined,
    {
      onSuccess: () =>
        openAlert({
          title: "Post deleted",
          content: "Post deleted successfully",
        }),
    },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};
