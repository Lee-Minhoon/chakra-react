import { queryParser } from "@/utils";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export interface OnPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

const usePagination = () => {
  const router = useRouter();

  const params = useMemo(() => {
    return {
      page: queryParser.toNumber(router.query.page) ?? 1,
      limit: queryParser.toNumber(router.query.limit) ?? 10,
      sort: queryParser.toString(router.query.sort) ?? "",
      order: (queryParser.toString(router.query.order) ?? "desc") as
        | "asc"
        | "desc",
    };
  }, [router.query]);

  const onPagination = useCallback(
    (params: OnPaginationParams) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...params },
      });
    },
    [router]
  );

  return { ...params, onPagination };
};

export default usePagination;
