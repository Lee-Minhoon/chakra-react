import { QueryKey } from "@/apis";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const useQueryKeyParams = (queryKey: QueryKey[0]) => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  return queryClient
    .getQueryCache()
    .findAll([queryKey])
    .find((query) => {
      if (!query.queryKey[1]) return false;
      return Object.entries(query.queryKey[1]).reduce(
        (isMatch, [key, value]) => {
          return isMatch && searchParams.get(key) === value.toString();
        },
        true
      );
    })?.queryKey[1] as QueryKey[1];
};

export default useQueryKeyParams;
