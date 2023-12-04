import { useGetUsers } from "@/apis";
import { UsersTable } from "@/containers";

const UsersAll = () => {
  const { data: users } = useGetUsers();

  return <UsersTable users={users ?? []} />;
};

export default UsersAll;
