import { User, useApproveUser, useDeleteUser } from "@/apis";
import DataTable from "@/components/DataTable";
import { usePagination } from "@/hooks";
import { useModalStore } from "@/stores";
import { Button, Flex } from "@chakra-ui/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { TbCheck, TbTrash } from "react-icons/tb";

const columnHelper = createColumnHelper<User>();

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const { openConfirm } = useModalStore(["openConfirm"]);

  const { offset, limit, isExist } = usePagination();
  const queryKeyValues = isExist ? { offset, limit } : undefined;
  const { mutate: deleteUser } = useDeleteUser(queryKeyValues);
  const { mutate: approveUser } = useApproveUser(queryKeyValues);

  const handleApprove = useCallback<(id?: number) => void>(
    (id) => {
      if (!id) return;
      openConfirm({
        title: "Approve User",
        content: "Are you sure you want to approve this user?",
        onConfirm: () => approveUser({ id }),
      });
    },
    [approveUser, openConfirm]
  );

  const handleDelete = useCallback<(id?: number) => void>(
    (id) => {
      if (!id) return;
      openConfirm({
        title: "Delete User",
        content: "Are you sure you want to delete this user?",
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
      columnHelper.accessor("approved", {
        cell: (context) => (
          <Flex>
            {context.row.original.approved ? (
              "Approved"
            ) : (
              <Button
                rightIcon={<TbCheck />}
                onClick={() => handleApprove(context.row.original.id)}
              >
                Approve
              </Button>
            )}
          </Flex>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (context) => (
          <Button
            rightIcon={<TbTrash />}
            onClick={() => handleDelete(context.row.original.id)}
          >
            Delete
          </Button>
        ),
      }),
    ],
    [handleApprove, handleDelete]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<User> table={table} />;
};

export default UsersTable;
