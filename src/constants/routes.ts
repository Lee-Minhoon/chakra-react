import { MatchFunction, ParamData, match } from "path-to-regexp";
import { IconType } from "react-icons";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export enum ApiRoutes {
  Upload = "api/file/upload",
  Signin = "api/auth/signin",
  Signout = "api/auth/signout",
  Me = "api/auth/me",
  User = "api/users{/:id}?",
  ApproveUser = "api/users{/:id}/approve",
  CreateTestUsers = "api/users/test{/:count}",
  ResetUsers = "api/users/test/reset",
  Post = "api/posts{/:id}?",
  CreateTestPosts = "api/posts/test{/:count}",
  ResetPosts = "api/posts/test/reset",
  LikedPost = "api/posts/liked",
}

export enum PageRoutes {
  Home = "/",
  Signin = "/auth/signin",
  Users = "/users",
  UserDetail = "/users/:id",
  Posts = "/posts",
  PostDetail = "/posts/:id",
  PostWrite = "/posts/write",
  PostEdit = "/posts/:id/edit",
}

export const whiteList = [
  PageRoutes.Home,
  PageRoutes.Signin,
  PageRoutes.Users,
  PageRoutes.UserDetail,
];

export const isExistPage = (pathname: string) => {
  return Object.values(PageRoutes).some((route) => match(route)(pathname));
};

export const isWhiteList = (pathname: string) => {
  return whiteList.some((route) => match(route)(pathname));
};

// t("Table")
// t("List")
// t("Grid")
export enum ViewQueries {
  Table = "table",
  List = "list",
  Grid = "grid",
}

export interface Nav {
  label: string;
  pathname: PageRoutes;
  search?: Record<string, string>;
  icon?: IconType;
  matcher: MatchFunction<ParamData>;
  children?: Nav[];
}

export const defaultQuery = {
  view: ViewQueries.Table,
  page: "1",
  limit: "10",
  sort: "id",
  order: "desc",
  search: "",
};

// t("Users")
// t("User Detail")
// t("Posts")
// t("Write Post")
// t("Post Detail")
export const navs: Nav[] = [
  {
    label: "Users",
    pathname: PageRoutes.Users,
    search: defaultQuery,
    icon: FaUser,
    matcher: match(PageRoutes.Users),
    children: [
      {
        label: "User Detail",
        pathname: PageRoutes.UserDetail,
        matcher: match(PageRoutes.UserDetail),
      },
    ],
  },
  {
    label: "Posts",
    pathname: PageRoutes.Posts,
    search: defaultQuery,
    icon: BsFillPostcardFill,
    matcher: match(PageRoutes.Posts),
    children: [
      {
        label: "Write Post",
        pathname: PageRoutes.PostWrite,
        matcher: match(PageRoutes.PostWrite),
      },
      {
        label: "Post Detail",
        pathname: PageRoutes.PostDetail,
        matcher: match(PageRoutes.PostDetail),
      },
      {
        label: "Edit Post",
        pathname: PageRoutes.PostEdit,
        matcher: match(PageRoutes.PostEdit),
      },
    ],
  },
];

export const getNavHierarchy = (
  pathname: string,
  items = navs,
  parents: Nav[] = []
): Nav[] => {
  for (const nav of items) {
    const matched = !!nav.matcher(pathname);
    if (matched) return [...parents, nav];
    if (nav.children) {
      const navs = getNavHierarchy(pathname, nav.children, [...parents, nav]);
      if (navs.length) return navs;
    }
  }
  return [];
};
