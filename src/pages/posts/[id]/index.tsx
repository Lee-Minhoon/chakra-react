import { useGetPost } from "@/apis";
import { PostCard } from "@/containers";
import { useHasScroll } from "@/hooks";
import { ResponsiveLayout } from "@/layouts";
import { QueryParser } from "@/utils";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const { data: post } = useGetPost(QueryParser.toNumber(id));
  const { ref, hasScroll } = useHasScroll();

  return (
    <ResponsiveLayout>
      <Box ref={ref} overflowY={"auto"} pr={hasScroll ? "2" : "0.5"}>
        <PostCard data={post} />
      </Box>
    </ResponsiveLayout>
  );
};

export default PostPage;
