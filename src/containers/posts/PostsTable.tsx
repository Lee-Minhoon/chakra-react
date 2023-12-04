import { Post } from "@/apis";
import { DataTable } from "@/components";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

const columnHelper = createColumnHelper<Post>();

interface PostsTableProps {
  posts: Post[];
}

const PostsTable = ({ posts }: PostsTableProps) => {
  const columns = useMemo(
    () => [columnHelper.accessor("id", {}), columnHelper.accessor("title", {})],
    []
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<Post> table={table} />;
};

export default PostsTable;
