import { apiRoutes, queryKeys } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useDelete, useGet, usePost, useUpdate } from "./generic";

interface Post {
  id?: number;
  title: string;
}

export const useGetPost = (id: number) => {
  return useGet<Post>(queryKeys.POST, apiRoutes.POST, { id });
};

export const useGetPosts = () => {
  return useGet<Post[]>(queryKeys.POST, apiRoutes.POST);
};

export const useGetLikedPosts = () => {
  return useGet<Post[]>(queryKeys.LIKED_POST, apiRoutes.LIKED_POST);
};

export const usePostPost = () => {
  const queryClient = useQueryClient();

  return usePost<Post[], Post>(
    queryKeys.POST,
    apiRoutes.POST,
    undefined,
    { onSettled: () => queryClient.invalidateQueries([queryKeys.LIKED_POST]) },
    (old, data) => {
      return [...old, data];
    }
  );
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useUpdate<Post[], Post>(
    queryKeys.POST,
    apiRoutes.POST,
    undefined,
    { onSettled: () => queryClient.invalidateQueries([queryKeys.LIKED_POST]) },
    (old, data) => {
      return old.map((item) => (item.id === data.id ? data : item));
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useDelete<Post[], number>(
    queryKeys.POST,
    apiRoutes.POST,
    undefined,
    { onSettled: () => queryClient.invalidateQueries([queryKeys.LIKED_POST]) },
    (old, id) => {
      return old.filter((item) => item.id !== id);
    }
  );
};
