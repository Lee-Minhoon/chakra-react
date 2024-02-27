import { QueryParser } from "@/utils";
import { useCallback, useMemo } from "react";
import { useSafePush } from ".";

export interface OnPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

const usePagination = () => {
  const { router, push } = useSafePush();

  const params = useMemo(() => {
    return {
      page: QueryParser.toNumber(router.query.page) ?? 1,
      limit: QueryParser.toNumber(router.query.limit) ?? 10,
      sort: QueryParser.toString(router.query.sort) ?? "",
      order: (QueryParser.toString(router.query.order) ?? "desc") as
        | "asc"
        | "desc",
    };
  }, [router.query]);

  const onPagination = useCallback(
    (params: OnPaginationParams) => {
      push({
        pathname: router.pathname,
        query: { ...router.query, ...params },
      });
    },
    [push, router.pathname, router.query]
  );

  return { ...params, onPagination };
};

export default usePagination;
