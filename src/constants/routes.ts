import { MatchFunction, match } from "path-to-regexp";
import { IconType } from "react-icons";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export enum ApiRoutes {
  Upload = "api/upload",
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
  Signin = "/auth/signin",
  Users = "/users",
  UserDetail = "/users/:id",
  Posts = "/posts",
  PostDetail = "/posts/:id",
  WritePost = "/posts/write",
  EditPost = "/posts/:id/edit",
}

// t("Table")
// t("List")
export enum ViewQueries {
  Table = "table",
  List = "list",
}

export interface Nav {
  label: string;
  pathname: string;
  query?: Record<string, number | string>;
  icon?: IconType;
  matcher: MatchFunction;
  children?: Nav[];
}

// t("Users")
// t("User Detail")
// t("Posts")
// t("Write Post")
// t("Post Detail")
export const navs: Nav[] = [
  {
    label: "Users",
    pathname: PageRoutes.Users,
    query: {
      view: ViewQueries.Table,
      page: 1,
      limit: 10,
      sort: "id",
      order: "desc",
      search: "",
    },
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
    query: {
      view: ViewQueries.Table,
      page: 1,
      limit: 10,
      sort: "id",
      order: "desc",
      search: "",
    },
    icon: BsFillPostcardFill,
    matcher: match(PageRoutes.Posts),
    children: [
      {
        label: "Write Post",
        pathname: PageRoutes.WritePost,
        matcher: match(PageRoutes.WritePost),
      },
      {
        label: "Post Detail",
        pathname: PageRoutes.PostDetail,
        matcher: match(PageRoutes.PostDetail),
      },
      {
        label: "Edit Post",
        pathname: PageRoutes.EditPost,
        matcher: match(PageRoutes.EditPost),
      },
    ],
  },
];

export const findNavInHierarchy = (
  pathname: string,
  items = navs,
  parents: Nav[] = []
): Nav[] => {
  for (const nav of items) {
    const matched = !!nav.matcher(pathname);
    if (matched) return [...parents, nav];
    if (nav.children) {
      const navs = findNavInHierarchy(pathname, nav.children, [
        ...parents,
        nav,
      ]);
      if (navs.length) return navs;
    } else {
      continue;
    }
  }
  return [];
};
