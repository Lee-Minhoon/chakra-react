import { useGetUsersByPage } from "@/apis";
import { Pagination } from "@/components";
import { UserTable } from "@/containers";
import { usePagination } from "@/hooks";
import { QueryParser } from "@/utils";
import { TableContainer } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const UserTableView = () => {
  const [searchParams] = useSearchParams();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: usersByPage, isLoading: usersIsLoading } = useGetUsersByPage({
    page,
    limit,
    sort,
    order,
    search: QueryParser.toString(searchParams.get("search")) ?? "",
  });

  return (
    <>
      <TableContainer flex={1} overflowY={"auto"}>
        <UserTable users={usersByPage?.data ?? []} isLoading={usersIsLoading} />
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

export default UserTableView;
