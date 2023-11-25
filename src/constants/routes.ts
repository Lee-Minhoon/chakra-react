export enum PageRoutes {
  Home = "/",
  UsersAll = "/users/all",
  UsersByOffset = "/users/offset",
  UsersByCursor = "/users/cursor",
  PostsAll = "/posts/all",
}

export enum ApiRoutes {
  Signin = "api/auth/signin",
  User = "api/users/:id?",
  ApproveUser = "api/users/:id?/approve",
  Post = "api/posts/:id?",
  LikedPost = "api/posts/liked",
}
