import { ApiRoutes, PageRoutes } from "@/constants";
import { Assignable, Nullable, Optional } from "@/types";
import { compile } from "path-to-regexp";

export const getProtocol = () => (import.meta.env.PROD ? "https" : "http");

export const getHost = () =>
  import.meta.env.PROD ? window.location.host : window.location.host;

export const toUrl = (
  pathname: string,
  search?: string | Record<string, string>
) => {
  const searchParams =
    typeof search === "string"
      ? search
      : new URLSearchParams(search).toString();
  return `${pathname}?${searchParams}`;
};

export const toPath = (path: PageRoutes | ApiRoutes, params?: object) => {
  return compile(path, { encode: encodeURIComponent })(
    Object.fromEntries(
      Object.entries(params || {}).map(([key, value]) => [
        key,
        value.toString(),
      ])
    )
  );
};

export class QueryParser {
  static toNumber = <T extends Optional<number>>(
    query?: Nullable<string>,
    defaultValue?: T
  ): Assignable<T, number> => {
    const num = Number(query);
    if (isNaN(num)) {
      return defaultValue as Assignable<T, number>;
    }
    return num as Assignable<T, number>;
  };
  static toString = <T extends string>(
    query: Nullable<string>,
    defaultValue?: T
  ): Assignable<T, string> => {
    if (!query) {
      return defaultValue as Assignable<T, string>;
    }
    return query.toString() as Assignable<T, string>;
  };
}
