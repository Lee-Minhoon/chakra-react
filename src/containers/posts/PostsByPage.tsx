import { useGetPostsByPage } from "@/apis";
import { Pagination } from "@/components";
import { PostTable } from "@/containers";
import { usePagination } from "@/hooks";
import { queryParser } from "@/utils";
import { TableContainer } from "@chakra-ui/react";
import { useRouter } from "next/router";

const PostsByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: postsByPage, isFetching: postsIsLoading } = useGetPostsByPage({
    page,
    limit,
    sort,
    order,
    search: queryParser.toString(router.query.search) ?? "",
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

export default PostsByPage;
