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

  const queryKey = useMemo(() => {
    let queryKey = {};
    if (router.query?.page) {
      queryKey = { ...queryKey, page: Number(router.query.page) };
    }
    if (router.query?.limit) {
      queryKey = { ...queryKey, limit: Number(router.query.limit) };
    }
    if (router.query?.sort) {
      queryKey = { ...queryKey, sort: router.query.sort };
    }
    if (router.query?.order) {
      queryKey = { ...queryKey, order: router.query.order };
    }
    return Object.keys(queryKey).length > 0 ? queryKey : undefined;
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

  return { ...params, queryKey, onPagination };
};

export default usePagination;
