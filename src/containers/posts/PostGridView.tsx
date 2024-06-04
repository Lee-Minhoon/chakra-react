import { Post, useGetPostsByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";
import { PostListItem } from ".";

const PostGridView = () => {
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
      countPerRow={4}
      useObserver
    />
  );
};

export default PostGridView;
