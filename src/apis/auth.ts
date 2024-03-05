import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Api, User, useFetch, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  const queryClient = useQueryClient();

  return usePost<unknown, AuthSignin, User>(
    toUrl(ApiRoutes.Signin),
    undefined,
    {
      onSuccess: (res) => {
        Api.addToken(res.data.id.toString());
        queryClient.invalidateQueries([toUrl(ApiRoutes.Me)]);
      },
      meta: { successMessage: "Signin successfully" },
    }
  );
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  return usePost<unknown>(toUrl(ApiRoutes.Signout), undefined, {
    onSuccess: () => {
      Api.removeToken();
      queryClient.invalidateQueries([toUrl(ApiRoutes.Me)]);
    },
    meta: { successMessage: "Signout successfully" },
  });
};

export const useGetMe = () => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
