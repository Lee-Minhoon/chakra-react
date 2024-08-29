import { useGetUser } from "@/apis";
import { UserCard } from "@/containers";
import { ResponsiveLayout } from "@/layouts";
import { QueryParser } from "@/utils";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();
  const { data: user } = useGetUser(QueryParser.toNumber(id));

  return (
    <ResponsiveLayout>
      <UserCard data={user} />
    </ResponsiveLayout>
  );
};

export default UserPage;
