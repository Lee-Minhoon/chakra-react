import { User, useApproveUser, useDeleteUser } from "@/apis";
import { DataTable } from "@/components";
import { PageRoutes } from "@/constants";
import { UserUpdateModal } from "@/containers";
import { usePagination, useRouterPush } from "@/hooks";
import { useModalStore } from "@/stores";
import { formatISO, toUrl } from "@/utils";
import {
  Row,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import UserActions from "./UserActions";
import UserApproved from "./UserApproved";
import UserName from "./UserName";

const columnHelper = createColumnHelper<User>();

interface UsersTableProps {
  users: User[];
  isFetching?: boolean;
}

const UserTable = ({ users, isFetching }: UsersTableProps) => {
  const { openModal } = useModalStore(["openModal"]);
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { push } = useRouterPush();
  const { queryKey } = usePagination();
  const { mutate: deleteUser } = useDeleteUser(queryKey);
  const { mutate: approveUser } = useApproveUser(queryKey);

  const handleUpdate = useCallback<(user: User) => void>(
    (user) => {
      if (!user) return;
      openModal(UserUpdateModal, { user });
    },
    [openModal]
  );

  const handleApprove = useCallback<(id: number) => void>(
    (id) => {
      openConfirm({
        title: "Approve User",
        content: "Are you sure you want to approve this user?",
        onConfirm: () => approveUser({ id }),
      });
    },
    [approveUser, openConfirm]
  );

  const handleDelete = useCallback<(id: number) => void>(
    (id) => {
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
      columnHelper.accessor("id", { meta: { sortable: true } }),
      columnHelper.accessor("name", {
        cell: (context) => (
          <UserName
            name={context.row.original.name}
            profile={context.row.original.profile}
          />
        ),
        meta: { sortable: true },
      }),
      columnHelper.accessor("email", { meta: { sortable: true } }),
      columnHelper.accessor("phone", { meta: { sortable: true } }),
      columnHelper.accessor("approved", {
        cell: (context) => (
          <UserApproved
            approved={context.row.original.approved}
            onApprove={(e) => {
              e.stopPropagation();
              handleApprove(context.row.original.id);
            }}
          />
        ),
        meta: { sortable: true },
      }),
      columnHelper.accessor("createdAt", {
        meta: { sortable: true },
        cell: (context) => formatISO(context.renderValue()!),
      }),
      columnHelper.accessor("updatedAt", {
        meta: { sortable: true },
        cell: (context) => formatISO(context.renderValue()!),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (context) => (
          <UserActions
            onUpdate={(e) => {
              e.stopPropagation();
              handleUpdate(context.row.original);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              handleDelete(context.row.original.id);
            }}
          />
        ),
      }),
    ],
    [handleApprove, handleDelete, handleUpdate]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClickRow = useCallback<(row: Row<User>) => void>(
    (row) => {
      push(toUrl(PageRoutes.UserDetail, { id: row.original.id }));
    },
    [push]
  );

  return (
    <DataTable<User>
      table={table}
      isFetching={isFetching}
      onRowClick={handleClickRow}
    />
  );
};

export default UserTable;
