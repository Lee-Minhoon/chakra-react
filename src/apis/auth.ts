import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { User, useFetch, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  return usePost<undefined, AuthSignin>(toUrl(ApiRoutes.Signin));
};

export const useGetMe = (enabled: boolean) => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    enabled,
  });
};
