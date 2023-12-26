import { Post, PostWithUser } from "@/apis";
import { DataTable } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import {
  Row,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo } from "react";

const columnHelper = createColumnHelper<PostWithUser>();

interface PostsTableProps {
  posts: PostWithUser[];
}

const PostsTable = ({ posts }: PostsTableProps) => {
  const { push } = useRouterPush();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { meta: { sortable: true } }),
      columnHelper.accessor("user.name", {
        header: "writer",
        cell: (context) => {
          const id = context.row.original.user?.id;
          const profile = context.row.original.user?.profile;
          return (
            <Flex gap={4} align={"center"}>
              <Box
                cursor={"pointer"}
                _hover={{ opacity: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  push(toUrl(PageRoutes.UserDetail, { id }));
                }}
              >
                <Avatar src={profile} w={10} h={10} />
              </Box>
              {context.renderValue()}
            </Flex>
          );
        },
        meta: { sortable: true },
      }),
      columnHelper.accessor("title", { meta: { sortable: true } }),
    ],
    [push]
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleClickRow = useCallback<(row: Row<Post>) => void>(
    (row) => {
      push(toUrl(PageRoutes.PostDetail, { id: row.original.id }));
    },
    [push]
  );

  return <DataTable<PostWithUser> table={table} onRowClick={handleClickRow} />;
};

export default PostsTable;
