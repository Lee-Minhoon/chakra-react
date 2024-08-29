import { Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const PageOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return Array.from({ length: 10 }).map((_, idx) => ({
      label: t("Show per page", { count: (idx + 1) * 10 }),
      value: (idx + 1) * 10,
    }));
  }, [t]);

  return (
    <Select
      w={"fit-content"}
      value={searchParams.get("limit") ?? 10}
      onChange={(e) => {
        setSearchParams((prev) => {
          prev.set("limit", e.target.value);
          return prev;
        });
      }}
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
