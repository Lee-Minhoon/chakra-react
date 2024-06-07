import { User, useApproveUser, useDeleteUser } from "@/apis";
import { DataTable } from "@/components";
import { ApiRoutes, PageRoutes } from "@/constants";
import { UserUpdateModal } from "@/containers";
import { useFormatDate, useQueryKeyParams, useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import UserActions from "./user-actions";
import UserApproved from "./user-approved";
import UserName from "./uesr-name";

const columnHelper = createColumnHelper<User>();

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

const UserTable = ({ users, isLoading }: UsersTableProps) => {
  const { openModal } = useModalStore(["openModal"]);
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { push } = useSafePush();
  const { t } = useTranslation();
  const formatDate = useFormatDate();
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.User));
  const { mutate: deleteUser } = useDeleteUser(queryKeyParams);
  const { mutate: approveUser } = useApproveUser(queryKeyParams);

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
        title: t("Approve User"),
        content: t("Are you sure you want to approve this user?"),
        onConfirm: () => approveUser({ id }),
      });
    },
    [approveUser, openConfirm, t]
  );

  const handleDelete = useCallback<(id: number) => void>(
    (id) => {
      openConfirm({
        title: t("Delete User"),
        content: t("Are you sure you want to delete this user?"),
        onConfirm: () => deleteUser(id),
      });
    },
    [deleteUser, openConfirm, t]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t("ID"),
        meta: { sortable: true },
      }),
      columnHelper.accessor("name", {
        header: t("User Name"),
        cell: (context) => (
          <UserName
            name={context.row.original.name}
            profile={context.row.original.profile}
          />
        ),
        meta: { sortable: true },
      }),
      columnHelper.accessor("email", {
        header: t("Email"),
        meta: {
          sortable: true,
        },
      }),
      columnHelper.accessor("phone", {
        header: t("Phone"),
        meta: { sortable: true },
      }),
      columnHelper.accessor("approved", {
        header: t("Approval Status"),
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
        header: t("Created At"),
        cell: (context) => formatDate(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.accessor("updatedAt", {
        header: t("Updated At"),
        cell: (context) => formatDate(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.display({
        id: "actions",
        header: t("Actions"),
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
    [formatDate, handleApprove, handleDelete, handleUpdate, t]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable<User>
      table={table}
      isLoading={isLoading}
      onRowClick={(row) =>
        push(toUrl(PageRoutes.UserDetail, { id: row.original.id }))
      }
    />
  );
};

export default UserTable;
