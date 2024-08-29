import { useGetPostsByPage } from "@/apis";
import { Pagination } from "@/components";
import { PostTable } from "@/containers";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { TableContainer } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const PostTableView = () => {
  const [searchParams] = useSearchParams();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: postsByPage, isLoading: postsIsLoading } = useGetPostsByPage({
    page,
    limit,
    sort,
    order,
    search: QueryParser.toString(searchParams.get("search")) ?? "",
  });

  return (
    <>
      <TableContainer flex={1} overflowY={"auto"}>
        <PostTable posts={postsByPage?.data ?? []} isLoading={postsIsLoading} />
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

export default PostTableView;
