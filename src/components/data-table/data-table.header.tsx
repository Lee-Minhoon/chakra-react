import { usePagination } from "@/hooks";
import { Flex, Icon, IconButton, Th, Thead, Tr } from "@chakra-ui/react";
import { Table as ReactTable, flexRender } from "@tanstack/react-table";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

interface DataTableHeaderProps<T> {
  table: ReactTable<T>;
}

const DataTableHeader = <T,>({ table }: DataTableHeaderProps<T>) => {
  const { sort, order, onPagination } = usePagination();

  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isSorted = sort === header.id;

            return (
              <Th key={header.id} px={"4"}>
                <Flex align={"center"} gap={"2"}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.columnDef.meta?.sortable && (
                    <IconButton
                      aria-label={"sort"}
                      variant={isSorted ? "solid" : "outline"}
                      size={"xs"}
                      onClick={() =>
                        onPagination({
                          sort: header.id,
                          order: isSorted
                            ? order === "desc"
                              ? "asc"
                              : "desc"
                            : "desc",
                        })
                      }
                    >
                      <Icon
                        as={
                          isSorted
                            ? order === "asc"
                              ? TiArrowSortedUp
                              : TiArrowSortedDown
                            : TiArrowUnsorted
                        }
                      />
                    </IconButton>
                  )}
                </Flex>
              </Th>
            );
          })}
        </Tr>
      ))}
    </Thead>
  );
};

export default DataTableHeader;
