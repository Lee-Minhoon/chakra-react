import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";
import { PostListItem } from "..";

const PostListView = () => {
  const router = useRouter();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<Post>
      infiniteQuery={useGetPostsByCursor({
        limit,
        sort,
        order,
        search: QueryParser.toString(router.query.search) ?? "",
      })}
      renderItem={PostListItem}
      useObserver
    />
  );
};

export default PostListView;
