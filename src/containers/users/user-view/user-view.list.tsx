import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { UserListItem } from "..";
import { useSearchParams } from "react-router-dom";

const UserListView = () => {
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
      useObserver
    />
  );
};

export default UserListView;
