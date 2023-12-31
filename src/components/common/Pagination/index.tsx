import { Button, Flex } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  limit: number;
  total: number;
  onChange: (page: number) => void;
}

const blockSize = 10;

const Pagination = ({
  currentPage,
  limit,
  total,
  onChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(total / limit);
  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const start = currentBlock * blockSize + 1;
  const end = Math.min(start + blockSize - 1, totalPage);

  return (
    <Flex gap={4} justify={"center"}>
      <Button isDisabled={start === 1} onClick={() => onChange(start - 1)}>
        Prev
      </Button>
      {Array.from({ length: end - start + 1 }, (_, i) => i + start).map(
        (page) => (
          <Button
            key={page}
            variant={page === currentPage ? "solid" : "outline"}
            onClick={() => onChange(page)}
          >
            {page}
          </Button>
        )
      )}
      <Button
        isDisabled={total === 0 || end === totalPage}
        onClick={() => onChange(end + 1)}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
