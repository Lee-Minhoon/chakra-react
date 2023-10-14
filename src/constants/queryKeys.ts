export const queryKeys = {
  USER: "users",
  LIKED_USER: "likedUsers",
};

export type QueryKey = (typeof queryKeys)[keyof typeof queryKeys];
