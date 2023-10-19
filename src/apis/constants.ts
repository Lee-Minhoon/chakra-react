export const apiRoutes = {
  USER: "api/users",
  POST: "api/posts",
  LIKED_POST: "api/posts/liked",
} as const;

export type ApiRoutes = (typeof apiRoutes)[keyof typeof apiRoutes];

export const queryType = {
  ALL: "all",
  OFFSET: "offset",
  CURSOR: "cursor",
} as const;

export type QueryType = (typeof queryType)[keyof typeof queryType];
