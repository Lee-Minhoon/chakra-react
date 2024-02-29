import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { usePostForm } from ".";

interface UploadResponse {
  filepath: string;
  mimetype: string;
  mtime: string;
  newFilename: string;
  originalFilename: string;
  size: number;
}

// [POST] /api/upload
export const useUpload = () => {
  return usePostForm<unknown, FormData, { [key: string]: UploadResponse[] }>(
    toUrl(ApiRoutes.Upload)
  );
};
