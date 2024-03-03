import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { usePostForm } from ".";

// [POST] /api/upload
export const useUpload = () => {
  return usePostForm<unknown, FormData, string>(toUrl(ApiRoutes.Upload));
};
