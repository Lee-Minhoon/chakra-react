import { ApiRoutes, PageRoutes } from "@/constants";
import { NextRouter, Url } from "next/dist/shared/lib/router/router";
import { compile } from "path-to-regexp";
import { ValueOf } from "type-fest";

export const toUrl = (path: PageRoutes | ApiRoutes, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params);

export class NextURL {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  get pathname() {
    if (typeof this.url === "string") {
      return this.url.split("?")[0];
    }
    return this.url.pathname;
  }

  get query() {
    if (typeof this.url === "string") {
      const queryString = this.url.split("?")[1];
      return Object.fromEntries(new URLSearchParams(queryString).entries());
    }
    return this.url.query;
  }

  toString() {
    if (typeof this.url === "string") return this.url;
    return (
      this.url.pathname +
      (this.url.query
        ? `?${new URLSearchParams(this.url.query as { [key: string]: string })}`
        : "")
    );
  }
}

type QueryValue = ValueOf<NextRouter["query"]>;

export class QueryParser {
  static toNumber = (query: QueryValue) => {
    const num = Number(query);
    if (isNaN(num)) {
      return undefined;
    }
    return num;
  };
  static toString = (query: QueryValue) => {
    return query?.toString();
  };
}
