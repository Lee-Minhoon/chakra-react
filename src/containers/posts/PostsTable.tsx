import { PostWithUser } from "@/apis";
import { DataTable, Profile } from "@/components";
import { PageRoutes } from "@/constants";
import { useRouterPush } from "@/hooks";
import { toUrl } from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

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
                onClick={() => push(toUrl(PageRoutes.UserDetail, { id }))}
              >
                <Profile profile={profile} w={10} h={10} />
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

  return <DataTable<PostWithUser> table={table} />;
};

export default PostsTable;
