import { useGetPosts } from "@/apis";
import PostsTable from "@/containers/posts/PostsTable";

const PostsAll = () => {
  const { data: posts } = useGetPosts();

  return <PostsTable posts={posts ?? []} />;
};

export default PostsAll;
