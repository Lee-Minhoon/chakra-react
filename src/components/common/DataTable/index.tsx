import { Center, Spinner, Table } from "@chakra-ui/react";
import { Table as ReactTable, Row } from "@tanstack/react-table";
import DataTableBody from "./Body";
import DataTableFooter from "./Footer";
import DataTableHeader from "./Header";

interface DataTableProps<T> {
  table: ReactTable<T>;
  isFetching?: boolean;
  onRowClick?: (row: Row<T>) => void;
}

const DataTable = <T,>({
  table,
  isFetching,
  onRowClick,
}: DataTableProps<T>) => {
  return (
    <>
      <Table>
        <DataTableHeader table={table} />
        {!isFetching && <DataTableBody table={table} onRowClick={onRowClick} />}
        <DataTableFooter table={table} />
      </Table>
      {isFetching && (
        <Center my={4}>
          <Spinner color={"primary.500"} />
        </Center>
      )}
    </>
  );
};

export default DataTable;
