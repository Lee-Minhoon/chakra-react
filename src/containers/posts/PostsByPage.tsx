import { useGetPostsByPage } from "@/apis";
import { Pagination } from "@/components";
import { PostTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const PostsByPage = () => {
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: postsByPage } = useGetPostsByPage({
    page,
    limit,
    sort,
    order,
  });

  return (
    <>
      <TableContainer flex={1} overflowY={"auto"}>
        <PostTable posts={postsByPage?.data ?? []} />
      </TableContainer>
      <Pagination
        currentPage={page}
        limit={limit}
        total={postsByPage?.total ?? 0}
        onChange={(page) => onPagination({ page })}
      />
    </>
  );
};

export default PostsByPage;
