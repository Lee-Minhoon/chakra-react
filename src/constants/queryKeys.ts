export const queryKeys = {
  USER: "users",
  POST: "posts",
  LIKED_POST: "likedPosts",
};

export type QueryKey = (typeof queryKeys)[keyof typeof queryKeys];
