import { useBreakpointValue } from "@chakra-ui/react";
import PaginationList from "./pagination.list";
import PaginationSelect from "./pagination.select";

export interface PaginationProps {
  currentPage: number;
  limit: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const Pagination = useBreakpointValue({
    base: PaginationSelect,
    lg: PaginationList,
  })!;

  return <Pagination {...props} />;
};

export default Pagination;
