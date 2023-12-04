import useBgColor from "@/hooks/useBgColor";
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { Table as ReactTable, Row, flexRender } from "@tanstack/react-table";

interface ReactTableProps<T> {
  table: ReactTable<T>;
  onRowClick?: (row: Row<T>) => void;
}

const DataTable = <T extends any>({
  table,
  onRowClick,
}: ReactTableProps<T>) => {
  const bgColor = useBgColor();

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            onClick={() => onRowClick?.(row)}
            _hover={{
              cursor: onRowClick ? "pointer" : "default",
              bgColor: onRowClick ? bgColor : undefined,
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <Tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Tfoot>
    </Table>
  );
};

export default DataTable;
