import { Tfoot, Th, Tr } from "@chakra-ui/react";
import { Table as ReactTable, flexRender } from "@tanstack/react-table";

interface DataTableFooterProps<T> {
  table: ReactTable<T>;
}

const DataTableFooter = <T,>({ table }: DataTableFooterProps<T>) => {
  return (
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
  );
};

export default DataTableFooter;
