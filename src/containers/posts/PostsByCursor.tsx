import { PostWithUser, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { PostListItem } from ".";

interface PostsByCursorProps {
  usesObserver?: boolean;
}

const PostsByCursor = ({ usesObserver }: PostsByCursorProps) => {
  const { limit, sort, order } = usePagination();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = useGetPostsByCursor({ limit, sort, order });

  return (
    <InfiniteList<PostWithUser>
      listItem={PostListItem}
      data={posts}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      usesObserver={usesObserver}
    />
  );
};

export default PostsByCursor;
