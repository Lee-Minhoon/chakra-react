import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { toPath } from "@/utils";
import {
  Api,
  User,
  useFetch,
  useInvalidateQueries,
  usePost,
  useResetQueries,
} from "..";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  const invalidate = useInvalidateQueries(toPath(ApiRoutes.Me));
  return usePost<unknown, AuthSignin, string>(
    toPath(ApiRoutes.Signin),
    undefined,
    {
      onSuccess: ({ data }) => {
        Api.addToken(data);
        invalidate();
      },
      meta: { successMessage: "Signin successfully" },
    }
  );
};

export const useSignout = () => {
  const reset = useResetQueries(toPath(ApiRoutes.Me));
  return () => {
    Api.removeToken();
    reset();
  };
};

export const useGetMe = () => {
  return useFetch<Nullable<User>>(toPath(ApiRoutes.Me), undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retryOnMount: false,
    meta: {
      ignoreError: true,
    },
  });
};
