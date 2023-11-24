import { ApiRoutes } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useCreate, useDelete, useGet, useUpdate } from "./hooks";

export interface Post {
  id?: number;
  title: string;
}

export const useGetPost = (id: number) => {
  return useGet<Post>(ApiRoutes.Post, { id });
};

export const useGetPosts = () => {
  return useGet<Post[]>(ApiRoutes.Post);
};

export const useGetLikedPosts = () => {
  return useGet<Post[]>(ApiRoutes.LikedPost);
};

export const usePostPost = () => {
  const queryClient = useQueryClient();

  return useCreate<Post[], Post>(
    ApiRoutes.Post,
    undefined,
    { onSuccess: () => queryClient.invalidateQueries([ApiRoutes.LikedPost]) },
    (old, data) => {
      return [...old, data];
    }
  );
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useUpdate<Post[], Post>(
    ApiRoutes.Post,
    undefined,
    { onSuccess: () => queryClient.invalidateQueries([ApiRoutes.LikedPost]) },
    (old, data) => {
      return old.map((item) => (item.id === data.id ? data : item));
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useDelete<Post[], number>(
    ApiRoutes.Post,
    undefined,
    { onSuccess: () => queryClient.invalidateQueries([ApiRoutes.LikedPost]) },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};
