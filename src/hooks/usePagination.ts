import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

const usePagination = () => {
  const router = useRouter();

  const page = useMemo(() => {
    return router.query?.page ? Number(router.query?.page) : 1;
  }, [router.query?.page]);

  const limit = useMemo(() => {
    return router.query?.limit ? Number(router.query?.limit) : 10;
  }, [router.query?.limit]);

  const onPageChange = useCallback(
    (page: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page },
      });
    },
    [router]
  );

  return { page, offset: (page - 1) * limit, limit, onPageChange };
};

export default usePagination;
