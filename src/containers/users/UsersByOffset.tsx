import { useGetUsersByOffset } from "@/apis";
import Pagination from "@/components/Pagination";
import UsersTable from "@/containers/users/UsersTable";
import { usePagination } from "@/hooks";

const UsersByOffset = () => {
  const { page, offset, limit, onPageChange } = usePagination();
  const { data: usersByOffset } = useGetUsersByOffset({
    offset,
    limit,
  });

  return (
    <>
      <UsersTable users={usersByOffset?.data ?? []} />
      <Pagination
        currentPage={page}
        limit={limit}
        total={usersByOffset?.total ?? 0}
        onChange={onPageChange}
      />
    </>
  );
};

export default UsersByOffset;
