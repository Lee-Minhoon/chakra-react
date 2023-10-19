import { Post, useGetPosts } from "@/apis";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import DataTable from "../../components/DataTable";

const columnHelper = createColumnHelper<Post>();

const columns = [
  columnHelper.accessor("id", {
    header: () => <span>ID</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("title", {
    id: "title",
    header: () => <span>Title</span>,
    cell: (info) => info.renderValue(),
  }),
];

const PostTable = () => {
  const { data } = useGetPosts();

  const posts = useMemo(() => {
    return data ? data : [];
  }, [data]);

  const table = useReactTable({
    data: posts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<Post> table={table} />;
};

export default PostTable;
