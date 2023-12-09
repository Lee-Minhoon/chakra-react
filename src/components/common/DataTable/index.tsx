import { Table } from "@chakra-ui/react";
import { Table as ReactTable, Row } from "@tanstack/react-table";
import DataTableBody from "./Body";
import DataTableFooter from "./Footer";
import DataTableHeader from "./Header";

interface DataTableProps<T> {
  table: ReactTable<T>;
  onRowClick?: (row: Row<T>) => void;
}

const DataTable = <T,>({ table, onRowClick }: DataTableProps<T>) => {
  return (
    <Table>
      <DataTableHeader table={table} />
      <DataTableBody table={table} onRowClick={onRowClick} />
      <DataTableFooter table={table} />
    </Table>
  );
};

export default DataTable;
