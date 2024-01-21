import { ApiRoutes, PageRoutes } from "@/constants";
import { compile } from "path-to-regexp";

export const toUrl = (path: PageRoutes | ApiRoutes, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params);

export class QueryParser {
  static toNumber = (query: string | string[] | undefined) => {
    const num = Number(query);
    if (isNaN(num)) {
      return undefined;
    }
    return num;
  };
  static toString = (query: string | string[] | undefined) => {
    if (!query) {
      return undefined;
    }
    return query.toString();
  };
}
