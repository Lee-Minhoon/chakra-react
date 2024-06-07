import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";
import { UserListItem } from "..";

const UserListView = () => {
  const router = useRouter();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<User>
      infiniteQuery={useGetUsersByCursor({
        limit,
        sort,
        order,
        search: QueryParser.toString(router.query.search) ?? "",
      })}
      renderItem={UserListItem}
      useObserver
    />
  );
};

export default UserListView;
