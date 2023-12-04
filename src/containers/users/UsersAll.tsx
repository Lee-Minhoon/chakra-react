import { useGetUsers } from "@/apis";
import { UsersTable } from "@/containers";
import { TableContainer } from "@chakra-ui/react";

const UsersAll = () => {
  const { data: users } = useGetUsers();

  return (
    <TableContainer flex={1} overflowY={"auto"}>
      <UsersTable users={users ?? []} />
    </TableContainer>
  );
};

export default UsersAll;
