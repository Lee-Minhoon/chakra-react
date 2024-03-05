import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { User, useFetch, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

const useInvalidateMe = (params?: object) => {
  const queryClient = useQueryClient();
  const queryKeyToInvalidate = params
    ? [toUrl(ApiRoutes.Me), params]
    : [toUrl(ApiRoutes.Me)];

  return () => {
    queryClient.invalidateQueries(queryKeyToInvalidate);
  };
};

export const useSignin = () => {
  return usePost<unknown, AuthSignin, User>(
    toUrl(ApiRoutes.Signin),
    undefined,
    {
      onSuccess: useInvalidateMe,
      meta: { successMessage: "Signin successfully" },
    }
  );
};

export const useSignout = () => {
  return usePost<unknown>(toUrl(ApiRoutes.Signout), undefined, {
    onSuccess: useInvalidateMe,
    meta: { successMessage: "Signout successfully" },
  });
};

export const useGetMe = () => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
