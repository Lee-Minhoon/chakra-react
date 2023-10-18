import { apiRoutes } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useDelete, useGet, usePost, useUpdate } from "./generic";

export interface Post {
  id?: number;
  title: string;
}

export const useGetPost = (id: number) => {
  return useGet<Post>(apiRoutes.POST, { id });
};

export const useGetPosts = () => {
  return useGet<Post[]>(apiRoutes.POST);
};

export const useGetLikedPosts = () => {
  return useGet<Post[]>(apiRoutes.LIKED_POST);
};

export const usePostPost = () => {
  const queryClient = useQueryClient();

  return usePost<Post[], Post>(
    apiRoutes.POST,
    undefined,
    { onSettled: () => queryClient.invalidateQueries([apiRoutes.LIKED_POST]) },
    (old, data) => {
      return [...old, data];
    }
  );
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useUpdate<Post[], Post>(
    apiRoutes.POST,
    undefined,
    { onSettled: () => queryClient.invalidateQueries([apiRoutes.LIKED_POST]) },
    (old, data) => {
      return old.map((item) => (item.id === data.id ? data : item));
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useDelete<Post[], number>(
    apiRoutes.POST,
    undefined,
    { onSettled: () => queryClient.invalidateQueries([apiRoutes.LIKED_POST]) },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};
