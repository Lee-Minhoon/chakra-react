import { Center, Spinner, Table } from "@chakra-ui/react";
import { Table as ReactTable, Row } from "@tanstack/react-table";
import DataTableBody from "./DataTableBody";
import DataTableFooter from "./DataTableFooter";
import DataTableHeader from "./DataTableHeader";

interface DataTableProps<T> {
  table: ReactTable<T>;
  isLoading?: boolean;
  onRowClick?: (row: Row<T>) => void;
}

const DataTable = <T,>({ table, isLoading, onRowClick }: DataTableProps<T>) => {
  return (
    <>
      <Table>
        <DataTableHeader table={table} />
        {!isLoading && <DataTableBody table={table} onRowClick={onRowClick} />}
        <DataTableFooter table={table} />
      </Table>
      {isLoading && (
        <Center my={4}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </>
  );
};

export default DataTable;
