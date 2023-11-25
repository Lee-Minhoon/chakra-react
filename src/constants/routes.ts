export enum ApiRoutes {
  Signin = "api/auth/signin",
  Me = "api/auth/me",
  User = "api/users/:id?",
  ApproveUser = "api/users/:id?/approve",
  Post = "api/posts/:id?",
  LikedPost = "api/posts/liked",
}

export enum PageRoutes {
  Home = "/",
  Users = "/users",
  Posts = "/posts",
}

export enum ViewOptionQueries {
  All = "all",
  Offset = "offset",
  CursorButton = "cursorButton",
  CursorObserver = "cursorObserver",
}
