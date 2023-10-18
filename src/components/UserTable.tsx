import { User, useGetUsers } from "@/apis";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReactTable from "./ReactTable";

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

const UserTable = () => {
  const { data: users } = useGetUsers();

  const table = useReactTable({
    data: users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <ReactTable<User> table={table} />;
};

export default UserTable;
