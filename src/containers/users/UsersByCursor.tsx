import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { UserListItem } from ".";

interface UsersByCursorProps {
  usesObserver?: boolean;
}

const UsersByCursor = ({ usesObserver }: UsersByCursorProps) => {
  const { limit, sort, order } = usePagination();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
  } = useGetUsersByCursor({ limit, sort, order });

  return (
    <InfiniteList<User>
      listItem={UserListItem}
      data={users}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      usesObserver={usesObserver}
    />
  );
};

export default UsersByCursor;
