import { User, useGetUsers } from "@/apis";
import DataTable from "@/components/DataTable";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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

const UsersAll = () => {
  const { data } = useGetUsers();

  const users = useMemo(() => {
    return data ? data : [];
  }, [data]);

  const table = useReactTable({
    data: users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<User> table={table} />;
};

export default UsersAll;
