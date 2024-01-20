import { useGetUsersByPage } from "@/apis";
import { Pagination } from "@/components";
import { UserTable } from "@/containers";
import { usePagination } from "@/hooks";
import { queryParser } from "@/utils";
import { TableContainer } from "@chakra-ui/react";
import { useRouter } from "next/router";

const UsersByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: usersByPage, isLoading: usersIsLoading } = useGetUsersByPage({
    page,
    limit,
    sort,
    order,
    search: queryParser.toString(router.query.search) ?? "",
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

export default UsersByPage;
