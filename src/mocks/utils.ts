import { getHost, getProtocol } from "@/utils";
import { DefaultBodyType, StrictRequest } from "msw";
import { Stringified } from "type-fest";

export const toEndpoint = (url: string) =>
  `${getProtocol()}://${getHost()}/${url}`;

export const getQueryParams = <T extends object>(
  request: StrictRequest<DefaultBodyType>
) => {
  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams) as Stringified<T>;
};
