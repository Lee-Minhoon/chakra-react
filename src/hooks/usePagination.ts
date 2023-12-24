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
      page: router.query?.page ? Number(router.query?.page) : 1,
      limit: router.query?.limit ? Number(router.query?.limit) : 10,
      sort: router.query?.sort ? router.query?.sort.toString() : "",
      order: (router.query?.order ? router.query?.order.toString() : "") as
        | "asc"
        | "desc",
    };
  }, [router.query]);

  const offset = useMemo(() => {
    return (params.page - 1) * params.limit;
  }, [params]);

  const queryKey = useMemo(() => {
    let queryKey = {};
    if (router.query?.page && router.query?.limit) {
      queryKey = { ...queryKey, offset };
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
  }, [offset, router.query]);

  const onPagination = useCallback(
    (params: OnPaginationParams) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...params },
      });
    },
    [router]
  );

  return { ...params, offset, queryKey, onPagination };
};

export default usePagination;
