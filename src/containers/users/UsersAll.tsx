import { useGetUsers } from "@/apis";
import { UserTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const UsersAll = () => {
  const { sort, order } = usePagination();
  const { data: users, isFetching: usersIsFetching } = useGetUsers({
    sort,
    order,
  });

  return (
    <TableContainer flex={1} overflowY={"auto"}>
      <UserTable users={users ?? []} isFetching={usersIsFetching} />
    </TableContainer>
  );
};

export default UsersAll;
