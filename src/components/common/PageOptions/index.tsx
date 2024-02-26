import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const PageOptions = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return Array.from({ length: 100 }).map((_, idx) => ({
      label: t("Show per page", { count: (idx + 1) * 10 }),
      value: (idx + 1) * 10,
    }));
  }, [t]);

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
