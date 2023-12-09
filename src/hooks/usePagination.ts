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
      sort: router.query?.sort ? router.query?.sort : "",
      order: router.query?.order ? router.query?.order : "",
    };
  }, [router.query]);

  const offset = useMemo(() => {
    return (params.page - 1) * params.limit;
  }, [params]);

  const isExist = useMemo(() => {
    return router.query?.page && router.query?.limit;
  }, [router.query?.page, router.query?.limit]);

  const onPagination = useCallback(
    (params: OnPaginationParams) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...params },
      });
    },
    [router]
  );

  return { ...params, offset, isExist, onPagination };
};

export default usePagination;
