import { useGetPosts } from "@/apis";
import { PostsTable } from "@/containers";

const PostsAll = () => {
  const { data: posts } = useGetPosts();

  return <PostsTable posts={posts ?? []} />;
};

export default PostsAll;
