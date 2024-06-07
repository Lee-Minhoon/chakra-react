import { useAlphaColor } from "@/hooks";
import { Tbody, Td, Tr } from "@chakra-ui/react";
import { Table as ReactTable, Row, flexRender } from "@tanstack/react-table";

interface DataTableBodyProps<T> {
  table: ReactTable<T>;
  onRowClick?: (row: Row<T>) => void;
}

const DataTableBody = <T,>({ table, onRowClick }: DataTableBodyProps<T>) => {
  const alphaColor = useAlphaColor();

  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => (
        <Tr
          key={row.id}
          onClick={() => onRowClick?.(row)}
          _hover={{
            cursor: onRowClick ? "pointer" : "default",
            bgColor: onRowClick ? alphaColor(50) : undefined,
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <Td key={cell.id} py={"2"} px={"4"}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default DataTableBody;
