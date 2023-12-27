import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";

interface PostsByCursorProps {
  observe?: boolean;
}

const PostsByCursor = ({ observe }: PostsByCursorProps) => {
  const { limit, sort, order } = usePagination();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = useGetPostsByCursor({ limit, sort, order });

  return (
    <InfiniteList<Post>
      usesObserver={observe}
      data={posts}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default PostsByCursor;
