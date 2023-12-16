import { useGetPostsByOffset } from "@/apis";
import { Pagination } from "@/components";
import { PostsTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const PostsAllPage = () => {
  const { page, offset, limit, sort, order, onPagination } = usePagination();
  const { data: postsByOffset } = useGetPostsByOffset({
    offset,
    limit,
    sort,
    order,
  });

  return (
    <>
      <TableContainer flex={1} overflowY={"auto"}>
        <PostsTable posts={postsByOffset?.data ?? []} />
      </TableContainer>
      <Pagination
        currentPage={page}
        limit={limit}
        total={postsByOffset?.total ?? 0}
        onChange={(page) => onPagination({ page })}
      />
    </>
  );
};

export default PostsAllPage;
