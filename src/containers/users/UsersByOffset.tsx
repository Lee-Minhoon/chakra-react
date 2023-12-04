import { useGetUsersByOffset } from "@/apis";
import { Pagination } from "@/components";
import { UsersTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const UsersByOffset = () => {
  const { page, offset, limit, onPageChange } = usePagination();
  const { data: usersByOffset } = useGetUsersByOffset({
    offset,
    limit,
  });

  return (
    <>
      <TableContainer flex={1} overflowY={"auto"}>
        <UsersTable users={usersByOffset?.data ?? []} />
      </TableContainer>
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
