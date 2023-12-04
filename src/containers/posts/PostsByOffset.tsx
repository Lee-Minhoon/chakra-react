import { useGetPostsByOffset } from "@/apis";
import { Pagination } from "@/components";
import { PostsTable } from "@/containers";
import { usePagination } from "@/hooks";

const PostsAllPage = () => {
  const { page, offset, limit, onPageChange } = usePagination();
  const { data: postsByOffset } = useGetPostsByOffset({
    offset,
    limit,
  });

  return (
    <>
      <PostsTable posts={postsByOffset?.data ?? []} />
      <Pagination
        currentPage={page}
        limit={limit}
        total={postsByOffset?.total ?? 0}
        onChange={onPageChange}
      />
    </>
  );
};

export default PostsAllPage;
