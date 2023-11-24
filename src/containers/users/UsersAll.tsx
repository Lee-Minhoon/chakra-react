import { User, useDeleteUser, useGetUsers } from "@/apis";
import DataTable from "@/components/DataTable";
import RowActions from "@/components/DataTable/RowActions";
import { useModalStore } from "@/stores";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";

const columnHelper = createColumnHelper<User>();

const UsersAll = () => {
  const { data } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { openConfirm } = useModalStore(["openConfirm"]);

  const users = useMemo(() => {
    return data ? data : [];
  }, [data]);

  const handleDelete = useCallback<(id?: number) => void>(
    (id) => {
      if (!id) return;
      openConfirm({
        title: "Delete User",
        message: "Are you sure you want to delete this user?",
        onConfirm: () => deleteUser(id),
      });
    },
    [deleteUser, openConfirm]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {}),
      columnHelper.accessor("name", {}),
      columnHelper.accessor("email", {}),
      columnHelper.accessor("phone", {}),
      columnHelper.accessor("approved", {}),
      columnHelper.display({
        id: "actions",
        cell: (context) => (
          <RowActions onDelete={() => handleDelete(context.row.original.id)} />
        ),
      }),
    ],
    [handleDelete]
  );

  const table = useReactTable({
    data: users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<User> table={table} />;
};

export default UsersAll;
