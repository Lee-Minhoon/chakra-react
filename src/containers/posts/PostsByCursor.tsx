import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { PostListItem } from ".";

interface PostsByCursorProps {
  usesObserver?: boolean;
}

const PostsByCursor = ({ usesObserver }: PostsByCursorProps) => {
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<Post>
      infiniteQuery={useGetPostsByCursor({ limit, sort, order })}
      renderItem={PostListItem}
      usesObserver={usesObserver}
    />
  );
};

export default PostsByCursor;
