import { BsFillPostcardFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export enum ApiRoutes {
  Signin = "api/auth/signin",
  Signout = "api/auth/signout",
  Me = "api/auth/me",
  User = "api/users/:id?",
  ApproveUser = "api/users/:id?/approve",
  Post = "api/posts/:id?",
  LikedPost = "api/posts/liked",
}

export enum PageRoutes {
  Home = "/",
  Users = "/users",
  UserDetail = "/users/:id",
  Posts = "/posts",
}

export enum ViewOptionQueries {
  All = "all",
  Offset = "offset",
  CursorButton = "cursorButton",
  CursorObserver = "cursorObserver",
}

export const navbarTabs = [
  {
    label: "Users",
    pathname: PageRoutes.Users,
    query: { view: ViewOptionQueries.All },
    icon: FaUser,
  },
  {
    label: "Posts",
    pathname: PageRoutes.Posts,
    query: { view: ViewOptionQueries.All },
    icon: BsFillPostcardFill,
  },
];

export type NavbarTab = (typeof navbarTabs)[number];
