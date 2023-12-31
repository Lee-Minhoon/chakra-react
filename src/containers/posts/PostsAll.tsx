import { useGetPosts } from "@/apis";
import { PostTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const PostsAll = () => {
  const { sort, order } = usePagination();
  const { data: posts, isLoading: postsIsLoading } = useGetPosts({
    sort,
    order,
  });

  return (
    <TableContainer flex={1} overflowY={"auto"}>
      <PostTable posts={posts ?? []} isLoading={postsIsLoading} />
    </TableContainer>
  );
};

export default PostsAll;
