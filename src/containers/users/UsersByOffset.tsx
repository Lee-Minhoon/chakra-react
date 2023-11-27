import { useGetUsersByOffset } from "@/apis";
import Pagination from "@/components/Pagination";
import UsersTable from "@/containers/users/UsersTable";
import { useRouter } from "next/router";

const UsersByOffset = () => {
  const router = useRouter();
  const page = router.query?.page ? Number(router.query?.page) : 1;
  const limit = router.query?.limit ? Number(router.query?.limit) : 10;
  const { data: usersByOffset } = useGetUsersByOffset({
    offset: (page - 1) * limit,
    limit,
  });

  return (
    <>
      <UsersTable users={usersByOffset?.data ?? []} />
      <Pagination
        currentPage={page}
        limit={limit}
        total={usersByOffset?.total ?? 0}
        onChange={(page) => router.push({ query: { ...router.query, page } })}
      />
    </>
  );
};

export default UsersByOffset;
