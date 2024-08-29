import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { PostListItem } from "..";

const PostListView = () => {
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
      useObserver
    />
  );
};

export default PostListView;
