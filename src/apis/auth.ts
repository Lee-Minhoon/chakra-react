import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { User, useFetch, useInvalidate, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  return usePost<unknown, AuthSignin, User>(
    toUrl(ApiRoutes.Signin),
    undefined,
    {
      onSuccess: useInvalidate(toUrl(ApiRoutes.Me)),
      meta: { successMessage: "Signin successfully" },
    }
  );
};

export const useSignout = () => {
  return usePost<unknown>(toUrl(ApiRoutes.Signout), undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.Me)),
    meta: { successMessage: "Signout successfully" },
  });
};

export const useGetMe = () => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
