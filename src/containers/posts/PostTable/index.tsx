import { Post } from "@/apis";
import { DataTable } from "@/components";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { formatISO, toUrl } from "@/utils";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import PostWriter from "./PostWriter";

const columnHelper = createColumnHelper<Post>();

interface PostTableProps {
  posts: Post[];
  isLoading?: boolean;
}

const PostTable = ({ posts, isLoading }: PostTableProps) => {
  const { push } = useSafePush();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { meta: { sortable: true } }),
      columnHelper.accessor("user", {
        header: "writer",
        cell: (context) => <PostWriter writer={context.renderValue()!} />,
        meta: { sortable: true },
      }),
      columnHelper.accessor("title", { meta: { sortable: true } }),
      columnHelper.accessor("createdAt", {
        meta: { sortable: true },
        cell: (context) => formatISO(context.renderValue()!),
      }),
      columnHelper.accessor("updatedAt", {
        meta: { sortable: true },
        cell: (context) => formatISO(context.renderValue()!),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable<Post>
      table={table}
      isLoading={isLoading}
      onRowClick={(row) =>
        push(toUrl(PageRoutes.PostDetail, { id: row.original.id }))
      }
    />
  );
};

export default PostTable;
