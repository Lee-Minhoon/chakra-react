import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";

interface UsersByCursorProps {
  observe?: boolean;
}

const UsersByCursor = ({ observe }: UsersByCursorProps) => {
  const { limit, sort, order } = usePagination();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
  } = useGetUsersByCursor({ limit, sort, order });

  return (
    <InfiniteList<User>
      usesObserver={observe}
      data={users}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default UsersByCursor;
