import { PageRoutes } from "@/constants";
import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";

const options = [
  { label: "All", pathname: PageRoutes.UsersAll, query: {} },
  {
    label: "Offset",
    pathname: PageRoutes.UsersByOffset,
    query: { page: 1, limit: 10 },
  },
  {
    label: "Cursor(Button)",
    pathname: PageRoutes.UsersByCursor,
    query: { type: "button" },
  },
  {
    label: "Cursor(Observer)",
    pathname: PageRoutes.UsersByCursor,
    query: { type: "observer" },
  },
];

const ViewOptions = () => {
  const router = useRouter();

  const selectedIdx = useMemo(() => {
    return options.findIndex(
      (option) =>
        option.pathname === router.pathname &&
        option.query?.type === router.query?.type
    );
  }, [router.pathname, router.query?.type]);

  return (
    <Select
      w={"fit-content"}
      value={selectedIdx}
      onChange={(e) => router.push({ ...options[Number(e.target.value)] })}
    >
      {options.map((option, idx) => (
        <option key={option.label} value={idx}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default ViewOptions;
