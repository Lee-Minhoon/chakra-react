import { PageRoutes } from "@/constants";
import HomePage from "@/pages";
import SigninPage from "@/pages/auth/signin";
import PostsAllPage from "@/pages/posts";
import PostPage from "@/pages/posts/[id]";
import PostWritePage from "@/pages/posts/write";
import UsersPage from "@/pages/users";
import UserPage from "@/pages/users/[id]";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PageRoutes.Home} element={<HomePage />} />
      <Route path={PageRoutes.Users} element={<UsersPage />} />
      <Route path={PageRoutes.UserDetail} element={<UserPage />} />
      <Route path={PageRoutes.Posts} element={<PostsAllPage />} />
      <Route path={PageRoutes.PostDetail} element={<PostPage />} />
      <Route path={PageRoutes.PostWrite} element={<PostWritePage />} />
      <Route path={PageRoutes.Signin} element={<SigninPage />} />
    </Routes>
  );
};

export default AppRoutes;
