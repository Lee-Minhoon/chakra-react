import { useGetUsers } from "@/apis";
import UsersTable from "@/containers/users/UsersTable";

const UsersAll = () => {
  const { data: users } = useGetUsers();

  return <UsersTable users={users ?? []} />;
};

export default UsersAll;
