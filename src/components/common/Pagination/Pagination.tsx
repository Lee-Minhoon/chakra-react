import { useBreakpointValue } from "@chakra-ui/react";
import ListPagination from "./ListPagination";
import SelectPagination from "./SelectPagination";

export interface PaginationProps {
  currentPage: number;
  limit: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const Pagination = useBreakpointValue({
    base: SelectPagination,
    lg: ListPagination,
  })!;

  return <Pagination {...props} />;
};

export default Pagination;
