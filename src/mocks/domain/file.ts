import { ApiResponse } from "@/apis";
import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";
import { uploadDB } from "../db";
import { toEndpoint } from "../utils";

const uploadFile = http.post<
  PathParams,
  DefaultBodyType,
  ApiResponse<Nullable<string>>
>(toEndpoint(ApiRoutes.Upload), async ({ request }) => {
  const data = await request.formData();
  const file = data.get("file");

  if (!(file instanceof File)) {
    return HttpResponse.json(
      { data: null, message: "File not found" },
      { status: 400 }
    );
  }

  const blob = new Blob([file], { type: file.type });
  const url = await uploadDB(blob);

  return HttpResponse.json(
    { data: url, message: "Successfully uploaded file" },
    { status: 201 }
  );
});

export const fileHandlers = [uploadFile];
