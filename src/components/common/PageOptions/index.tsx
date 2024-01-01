import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const PageOptions = () => {
  const router = useRouter();

  const options = useMemo(() => {
    return Array.from({ length: 100 }).map((_, idx) => ({
      label: `Show ${(idx + 1) * 10} per page`,
      value: (idx + 1) * 10,
    }));
  }, []);

  return (
    <Select
      w={"fit-content"}
      value={router.query?.limit}
      onChange={(e) =>
        router.push({ query: { ...router.query, limit: e.target.value } })
      }
    >
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default PageOptions;
