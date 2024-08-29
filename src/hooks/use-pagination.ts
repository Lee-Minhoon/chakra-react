import { Order } from "@/apis";
import { QueryParser } from "@/utils";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Entries } from "type-fest";

export interface OnPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return {
      page: QueryParser.toNumber(searchParams.get("page"), 1),
      limit: QueryParser.toNumber(searchParams.get("limit"), 10),
      sort: QueryParser.toString(searchParams.get("sort")),
      order: QueryParser.toString(searchParams.get("order"), "desc") as Order,
    };
  }, [searchParams]);

  const onPagination = useCallback<(params: OnPaginationParams) => void>(
    (params) => {
      setSearchParams((prev) => {
        (Object.entries(params) as Entries<OnPaginationParams>).forEach(
          ([key, value]) => {
            if (value) {
              prev.set(key, value.toString());
            } else {
              prev.delete(key);
            }
          }
        );
        return prev;
      });
    },
    [setSearchParams]
  );

  return { ...params, onPagination };
};

export default usePagination;
