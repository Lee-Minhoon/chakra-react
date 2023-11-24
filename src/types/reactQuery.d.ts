import "@tanstack/query-core";

declare module "@tanstack/query-core" {
  interface QueryMeta {
    ignoreError?: boolean;
  }
}
