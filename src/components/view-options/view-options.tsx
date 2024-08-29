import { ViewQueries } from "@/constants";
import { Select } from "@chakra-ui/react";
import { capitalize } from "lodash-es";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const options = [
  {
    label: capitalize(ViewQueries.Table),
    query: {
      view: ViewQueries.Table.toString(),
      page: "1",
      limit: "10",
      sort: "id",
      order: "desc",
    },
  },
  {
    label: capitalize(ViewQueries.List),
    query: {
      view: ViewQueries.List.toString(),
      limit: "10",
      sort: "id",
      order: "desc",
    },
  },
  {
    label: capitalize(ViewQueries.Grid),
    query: {
      view: ViewQueries.Grid.toString(),
      limit: "10",
      sort: "id",
      order: "desc",
    },
  },
];

const ViewOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
    <Select
      w={"fit-content"}
      value={searchParams.get("view") || ViewQueries.Table}
      onChange={(e) => {
        const option = options.find(
          (option) => option.query.view === e.target.value
        );
        if (!option) return;
        setSearchParams((prev) => {
          Object.entries(option.query).forEach(([key, value]) => {
            prev.set(key, value);
          });
          return prev;
        });
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
