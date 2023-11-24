export enum PageRoutes {
  Home = "/",
  UsersAll = "/users/all",
  UsersByOffset = "/users/offset",
  UsersByCursor = "/users/cursor",
}

export enum ApiRoutes {
  User = "api/users/:id?",
  Post = "api/posts/:id?",
  LikedPost = "api/posts/liked",
}
