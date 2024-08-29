import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { UserListItem } from "..";

const UserGridView = () => {
  const [searchParams] = useSearchParams();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<User>
      infiniteQuery={useGetUsersByCursor({
        limit,
        sort,
        order,
        search: QueryParser.toString(searchParams.get("search")) ?? "",
      })}
      renderItem={UserListItem}
      countPerRow={4}
      useObserver
    />
  );
};

export default UserGridView;
