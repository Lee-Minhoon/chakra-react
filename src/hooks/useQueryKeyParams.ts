import { QueryKey } from "@/apis";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";

const useQueryKeyParams = (queryKey: QueryKey[0]) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMemo(
    () =>
      queryClient
        .getQueryCache()
        .findAll([queryKey])
        .find((query) => {
          if (!query.queryKey[1]) return false;
          return Object.entries(query.queryKey[1]).reduce(
            (isMatch, [key, value]) => {
              return isMatch && router.query[key] === value.toString();
            },
            true
          );
        })?.queryKey[1],
    [queryClient, queryKey, router.query]
  ) as QueryKey[1];
};

export default useQueryKeyParams;
