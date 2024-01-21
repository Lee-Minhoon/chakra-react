import { ViewQueries } from "@/constants";
import { useSafePush } from "@/hooks";
import { Select } from "@chakra-ui/react";
import { useMemo } from "react";

const options = [
  {
    label: "Page",
    query: {
      view: ViewQueries.Page,
      page: 1,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: "Cursor(Button)",
    query: {
      view: ViewQueries.CursorButton,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: "Cursor(Observer)",
    query: {
      view: ViewQueries.CursorObserver,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
];

const ViewOptions = () => {
  const { router, push } = useSafePush();

  const selectedIdx = useMemo(() => {
    return options.findIndex(
      (option) => option.query?.view === router.query?.view
    );
  }, [router.query?.view]);

  return (
    <Select
      w={"fit-content"}
      value={selectedIdx}
      onChange={(e) =>
        push({
          query: { ...router.query, ...options[Number(e.target.value)].query },
        })
      }
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
