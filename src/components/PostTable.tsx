import { Post, useGetPosts } from "@/apis";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReactTable from "./ReactTable";

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
  const { data: posts } = useGetPosts();

  const table = useReactTable({
    data: posts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <ReactTable<Post> table={table} />;
};

export default PostTable;
