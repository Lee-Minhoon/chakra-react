import { useGetPost } from "@/apis";
import { PostUpdateForm } from "@/containers";
import { ResponsiveLayout } from "@/layouts";
import { QueryParser } from "@/utils";
import { useParams } from "react-router-dom";

const PostEditPage = () => {
  const { id } = useParams();
  const { data: post } = useGetPost(QueryParser.toNumber(id));

  return (
    <ResponsiveLayout>
      {post && <PostUpdateForm post={post} />}
    </ResponsiveLayout>
  );
};

export default PostEditPage;
