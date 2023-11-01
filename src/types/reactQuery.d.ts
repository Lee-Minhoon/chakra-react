import { QueryType } from "@/apis";
import { QueryMeta } from "@tanstack/query-core";

declare module "@tanstack/query-core" {
  interface QueryMeta {
    type?: QueryType;
    ignoreError?: boolean;
  }
}
