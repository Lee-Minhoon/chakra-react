import { fillZero } from "@/utils";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365 * DAY;

const useFormatDate = () => {
  const { t } = useTranslation();

  return useCallback(
    (value?: string) => {
      if (!value) return "";

      const now = new Date();
      const date = new Date(value);
      const diff = now.getTime() - date.getTime();

      if (diff < MINUTE) {
        return t("Just now");
      } else if (diff < HOUR) {
        return `${Math.floor(diff / MINUTE)} ${t("minutes ago")}`;
      } else if (diff < DAY) {
        return `${Math.floor(diff / HOUR)} ${t("hours ago")}`;
      } else if (diff < WEEK) {
        return `${Math.floor(diff / DAY)} ${t("days ago")}`;
      }

      const year = date.getFullYear();
      const month = fillZero(date.getMonth() + 1, 2);
      const day = fillZero(date.getDate(), 2);

      if (diff < YEAR) {
        return `${month}-${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    },
    [t]
  );
};

export default useFormatDate;
