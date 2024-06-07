import { Select } from "@chakra-ui/react";
import { PaginationProps } from "./pagination";

const PaginationSelect = ({
  currentPage,
  limit,
  total,
  onChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(total / limit);

  return (
    <Select
      value={currentPage}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <option key={page}>{page}</option>
      ))}
    </Select>
  );
};

export default PaginationSelect;
