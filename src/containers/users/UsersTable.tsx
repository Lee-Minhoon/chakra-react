import { User, useApproveUser, useDeleteUser } from "@/apis";
import { DataTable } from "@/components";
import { useBgColor, usePagination, useRouterPush } from "@/hooks";
import { useModalStore } from "@/stores";
import { Optional } from "@/types";
import {
  Box,
  Flex,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Row,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { TbCheck, TbEdit, TbTrash } from "react-icons/tb";
import UserUpdateModal from "./UserUpdateModal";

const columnHelper = createColumnHelper<User>();

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Optional<User>>();
  const { openConfirm } = useModalStore(["openConfirm"]);
  const bgColor = useBgColor();
  const { push } = useRouterPush();
  const { offset, limit, sort, order, isExist } = usePagination();
  const queryKeyValues = isExist ? { offset, limit, sort, order } : undefined;
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
      columnHelper.accessor("id", { meta: { sortable: true } }),
      columnHelper.accessor("name", {
        cell: (context) => {
          const profile = context.row.original.profile;
          return (
            <Flex gap={4} align={"center"}>
              <Box
                pos={"relative"}
                overflow={"hidden"}
                w={10}
                h={10}
                bgColor={bgColor}
                borderRadius={"full"}
              >
                {profile && (
                  <Image
                    fill
                    sizes={"100%"}
                    src={profile}
                    alt={"profile"}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </Box>
              {context.renderValue()}
            </Flex>
          );
        },
        meta: { sortable: true },
      }),
      columnHelper.accessor("email", { meta: { sortable: true } }),
      columnHelper.accessor("phone", { meta: { sortable: true } }),
      columnHelper.accessor("approved", {
        cell: (context) => (
          <Flex>
            {context.row.original.approved ? (
              "Approved"
            ) : (
              <Tooltip hasArrow label={"Approve User"}>
                <IconButton
                  aria-label="approve"
                  size={"sm"}
                  icon={<TbCheck />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(context.row.original.id);
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        ),
        meta: { sortable: true },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (context) => (
          <Flex gap={2}>
            <Tooltip hasArrow label={"Edit User"}>
              <IconButton
                aria-label="edit"
                size={"sm"}
                icon={<TbEdit />}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(context.row.original);
                  onOpen();
                }}
              />
            </Tooltip>
            <Tooltip hasArrow label={"Delete User"}>
              <IconButton
                aria-label="delete"
                size={"sm"}
                icon={<TbTrash />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(context.row.original.id);
                }}
              />
            </Tooltip>
          </Flex>
        ),
      }),
    ],
    [bgColor, handleApprove, onOpen, handleDelete]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClickRow = useCallback<(row: Row<User>) => void>(
    (row) => {
      push(`/users/${row.original.id}`);
    },
    [push]
  );

  return (
    <>
      {selectedUser && (
        <UserUpdateModal
          user={selectedUser}
          isOpen={isOpen}
          onClose={() => {
            setSelectedUser(undefined);
            onClose();
          }}
        />
      )}
      <DataTable<User> table={table} onRowClick={handleClickRow} />
    </>
  );
};

export default UsersTable;
