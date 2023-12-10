import { useGetUsers } from "@/apis";
import { UsersTable } from "@/containers";
import { usePagination } from "@/hooks";
import { TableContainer } from "@chakra-ui/react";

const UsersAll = () => {
  const { sort, order } = usePagination();
  const { data: users } = useGetUsers({ sort, order });

  return (
    <TableContainer flex={1} overflowY={"auto"}>
      <UsersTable users={users ?? []} />
    </TableContainer>
  );
};

export default UsersAll;
