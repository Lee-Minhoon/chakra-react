import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { queryParser } from "@/utils";
import { useRouter } from "next/router";
import { UserListItem } from ".";

interface UsersByCursorProps {
  usesObserver?: boolean;
}

const UsersByCursor = ({ usesObserver }: UsersByCursorProps) => {
  const router = useRouter();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<User>
      infiniteQuery={useGetUsersByCursor({
        limit,
        sort,
        order,
        search: queryParser.toString(router.query.search) ?? "",
      })}
      renderItem={UserListItem}
      usesObserver={usesObserver}
    />
  );
};

export default UsersByCursor;
