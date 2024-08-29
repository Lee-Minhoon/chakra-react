import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { PostListItem } from "..";

const PostGridView = () => {
  const [searchParams] = useSearchParams();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<Post>
      infiniteQuery={useGetPostsByCursor({
        limit,
        sort,
        order,
        search: QueryParser.toString(searchParams.get("search")) ?? "",
      })}
      renderItem={PostListItem}
      countPerRow={4}
      useObserver
    />
  );
};

export default PostGridView;
