import { User, useGetUsersByOffset } from "@/apis";
import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useMemo } from "react";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    header: () => <span>ID</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("email", {
    header: () => <span>Email</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("phone", {
    header: () => <span>Phone</span>,
    cell: (info) => info.renderValue(),
  }),
];

const limit = 10;

const UsersByOffset = () => {
  const router = useRouter();
  const page = router.query?.page ? Number(router.query?.page) : 1;
  const { data } = useGetUsersByOffset({
    offset: (page - 1) * limit,
    limit: 10,
  });

  const users = useMemo(() => {
    return data?.data ? data.data : [];
  }, [data]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <DataTable<User> table={table} />
      <Pagination
        currentPage={page}
        limit={10}
        total={data?.total ?? 0}
        onChange={(page) => router.push({ query: { page } })}
      />
    </>
  );
};

export default UsersByOffset;
