import { ApiRoutes } from "@/constants";
import { toPath } from "@/utils";
import { usePostForm } from "..";

// [POST] /api/file/upload
export const useUploadFile = () => {
  return usePostForm<unknown, FormData, string>(toPath(ApiRoutes.Upload));
};
