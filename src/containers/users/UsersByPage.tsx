import { useGetUsersByPage } from "@/apis";
import { Pagination } from "@/components";
import { UserTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const UsersByPage = () => {
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: usersByPage } = useGetUsersByPage({
    page,
    limit,
    sort,
    order,
  });

  return (
    <>
      <TableContainer flex={1} overflowY={"auto"}>
        <UserTable users={usersByPage?.data ?? []} />
      </TableContainer>
      <Pagination
        currentPage={page}
        limit={limit}
        total={usersByPage?.total ?? 0}
        onChange={(page) => onPagination({ page })}
      />
    </>
  );
};

export default UsersByPage;
