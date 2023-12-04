import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { User, useFetch, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  const queryClient = useQueryClient();

  return usePost<undefined, AuthSignin>(toUrl(ApiRoutes.Signin), undefined, {
    onSuccess: () => queryClient.invalidateQueries([toUrl(ApiRoutes.Me)]),
    meta: { successMessage: "Signin successfully" },
  });
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  return usePost<undefined>(toUrl(ApiRoutes.Signout), undefined, {
    onSuccess: () => queryClient.invalidateQueries([toUrl(ApiRoutes.Me)]),
    meta: { successMessage: "Signout successfully" },
  });
};

export const useGetMe = (enabled = true) => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    enabled,
  });
};
