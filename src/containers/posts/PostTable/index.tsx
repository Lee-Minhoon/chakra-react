import { Post } from "@/apis";
import { DataTable } from "@/components";
import { PageRoutes } from "@/constants";
import { useFormatDate, useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PostWriter from "./PostWriter";

const columnHelper = createColumnHelper<Post>();

interface PostTableProps {
  posts: Post[];
  isLoading?: boolean;
}

const PostTable = ({ posts, isLoading }: PostTableProps) => {
  const { t } = useTranslation();
  const { push } = useSafePush();
  const formatDate = useFormatDate();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t("ID"),
        meta: { sortable: true },
      }),
      columnHelper.accessor("user", {
        header: t("Writer"),
        cell: (context) => <PostWriter writer={context.renderValue()!} />,
        meta: { sortable: true },
      }),
      columnHelper.accessor("title", {
        header: t("Title"),
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
    ],
    [formatDate, t]
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
