import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { User, usePost } from ".";

export interface AuthSignin {
  email: User["email"];
}

export const useSignin = () => {
  return usePost<undefined, AuthSignin>(toUrl(ApiRoutes.Signin), undefined);
};
