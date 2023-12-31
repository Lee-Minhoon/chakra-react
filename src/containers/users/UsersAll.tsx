import { useGetUsers } from "@/apis";
import { UserTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const UsersAll = () => {
  const { sort, order } = usePagination();
  const { data: users, isLoading: usersIsLoading } = useGetUsers({
    sort,
    order,
  });

  return (
    <TableContainer flex={1} overflowY={"auto"}>
      <UserTable users={users ?? []} isLoading={usersIsLoading} />
    </TableContainer>
  );
};

export default UsersAll;
