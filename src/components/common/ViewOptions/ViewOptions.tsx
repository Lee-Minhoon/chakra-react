import { ViewQueries } from "@/constants";
import { useSafePush } from "@/hooks";
import { Select } from "@chakra-ui/react";
import { capitalize } from "lodash-es";
import { useTranslation } from "react-i18next";

const options = [
  {
    label: capitalize(ViewQueries.Table),
    query: {
      view: ViewQueries.Table,
      page: 1,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: capitalize(ViewQueries.List),
    query: {
      view: ViewQueries.List,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
  {
    label: capitalize(ViewQueries.Grid),
    query: {
      view: ViewQueries.Grid,
      limit: 10,
      sort: "id",
      order: "desc",
    },
  },
];

const ViewOptions = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  return (
    <Select
      w={"fit-content"}
      value={router.query?.view}
      onChange={(e) => {
        const option = options.find(
          (option) => option.query.view === e.target.value
        );
        if (!option) return;
        push({ query: { ...router.query, ...option.query } });
      }}
    >
      {options.map((option) => (
        <option key={option.label} value={option.query.view}>
          {t(option.label)}
        </option>
      ))}
    </Select>
  );
};

export default ViewOptions;
