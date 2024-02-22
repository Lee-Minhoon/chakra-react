import { Nullable, Optional } from "@/types";
import {
  MutationFunction,
  QueryFunctionContext,
  UseMutationOptions,
  useInfiniteQuery as _useInfiniteQuery,
  useMutation as _useMutation,
  useQuery as _useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ApiError,
  ApiResponse,
  CursorQueryResponse,
  ID,
  InfiniteQueryOptions,
  MutationOptions,
  PageQueryOptions,
  PageQueryResponse,
  QueryKey,
  QueryOptions,
  UrlBuilder,
} from "./types";
import { api, buildQueryKey, buildUrl } from "./utils";

// TOldData: Data type of previous data (이전 데이터 타입)
// TNewData: Data type of request (요청 데이터 타입)
// TResponse: Data type of response (응답 데이터 타입)

const fetcher = async <TRes>(context: QueryFunctionContext<QueryKey>) => {
  const { queryKey, pageParam } = context;
  const [url, params] = queryKey;
  return api
    .get<ApiResponse<TRes>>(
      buildUrl(url, undefined)!,
      pageParam !== undefined ? { ...params, cursor: pageParam } : { ...params }
    )
    .then((res) => res.data);
};

const useQuery = <TRes>(
  url: Nullable<string>,
  params?: object,
  options?: QueryOptions<TRes>
) => {
  return _useQuery<TRes, ApiError, TRes, QueryKey>(
    [url!, params],
    (context) => fetcher<TRes>(context),
    {
      enabled: !!url,
      ...options,
    }
  );
};

const useInfiniteQuery = <TRes>(
  url: Nullable<string>,
  params?: object,
  options?: InfiniteQueryOptions<TRes>
) => {
  return _useInfiniteQuery<
    CursorQueryResponse<TRes, number>,
    ApiError,
    CursorQueryResponse<TRes, number>,
    QueryKey
  >(
    [url!, params],
    ({ pageParam = 0, ...rest }) =>
      fetcher<CursorQueryResponse<TRes, number>>({ pageParam, ...rest }),
    {
      ...options,
      getPreviousPageParam: (firstPage) => firstPage.previous,
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
};

export const useMutation = <TOld, TNew, TRes>(
  mutationFn: MutationFunction<TRes, TNew>,
  options?: UseMutationOptions<TRes, ApiError, TNew>,
  queryKey?: QueryKey<TNew>,
  updater?: (old: TOld, data: TNew) => Optional<TOld>
) => {
  const queryClient = useQueryClient();

  return _useMutation<TRes, ApiError, TNew>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      options?.onMutate?.(variables);
      if (!queryKey) return;
      const builtQueryKey = buildQueryKey(queryKey, variables);
      console.log("The mutation has been executed.", builtQueryKey);

      // 낙관적 업데이트(쿼리 키가 없으면 실행되지 않음)
      // Optimistic update(does not run if query key is not present)
      await queryClient.cancelQueries(builtQueryKey);
      const previousData = queryClient.getQueryData(builtQueryKey);
      queryClient.setQueryData<TOld>(queryKey, (old) => {
        old && updater && console.log("Optimistic updates are run.", queryKey);
        return old && updater ? updater(old, variables) : old;
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      if (!queryKey) return;

      // 에러가 발생할 경우 이전 데이터로 되돌립니다.
      // If an error occurs, it returns to old data.
      queryClient.setQueryData(buildQueryKey(queryKey, variables), context);
    },
    onSettled: (data, err, variables, context) => {
      options?.onSettled?.(data, err, variables, context);
      if (!queryKey) return;

      // 쿼리를 무효화 합니다.
      // Invalidates the query.
      const queryKeyToInvalidate = buildQueryKey(queryKey, variables);
      console.log("The query has been invalidated.", queryKeyToInvalidate);
      queryClient.invalidateQueries(queryKeyToInvalidate);
    },
  });
};

export const useFetch = <TRes>(
  url: string,
  params?: object,
  options?: QueryOptions<TRes>
) => {
  return useQuery<TRes>(url, params, options);
};

export const useGetPage = <TRes>(
  url: string,
  params?: object,
  options?: PageQueryOptions<TRes>
) => {
  return useQuery<PageQueryResponse<TRes>>(url, params, {
    ...options,
    keepPreviousData: true,
  });
};

export const useLoadMore = <TRes>(
  url: string,
  params?: object,
  options?: InfiniteQueryOptions<TRes>
) => {
  return useInfiniteQuery<TRes>(url, params, options);
};

export const usePost = <
  TOld,
  TNew extends object | void = void,
  TRes = unknown,
>(
  url: UrlBuilder<TNew>,
  params?: object,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, data: TNew) => TOld
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (data) => api.post<ApiResponse<TRes>>(buildUrl(url, data), data ?? {}),
    options,
    [url, params],
    updater
  );
};

export const useUpdate = <
  TOld,
  TNew extends object & { id?: ID },
  TRes = unknown,
>(
  url: UrlBuilder<TNew>,
  params?: object,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, data: TNew) => TOld
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (data) => api.put<ApiResponse<TRes>>(buildUrl(url, data), data),
    options,
    [url, params],
    updater
  );
};

export const useUpdateInList = <
  TOld,
  TNew extends object & { id?: ID },
  TRes = unknown,
>(
  url: UrlBuilder<TNew>,
  params?: object,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, data: TNew) => TOld
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (data) => {
      const { id, ...rest } = data;
      const builtUrl = buildUrl(url, data);
      return api.put<ApiResponse<TRes>>(
        id ? `${builtUrl}/${id}` : builtUrl,
        rest
      );
    },
    options,
    [url, params],
    updater
  );
};

export const useDelete = <TOld, TNew = ID | void, TRes = unknown>(
  url: string,
  params?: object,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, id: TNew) => TOld
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (id) => api.delete<ApiResponse<TRes>>(id ? `${url}/${id}` : url),
    options,
    [url, params],
    updater
  );
};

export const useCommand = <
  TOld,
  TNew extends object & { id: ID },
  TRes = unknown,
>(
  url: UrlBuilder<TNew>,
  queryKey?: QueryKey<TNew>,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, data: TNew) => TOld,
  method: "POST" | "PUT" | "PATCH" = "POST"
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (data) => {
      switch (method) {
        case "POST":
          return api.post<ApiResponse<TRes>>(buildUrl(url, data), data);
        case "PUT":
          return api.put<ApiResponse<TRes>>(buildUrl(url, data), data);
        case "PATCH":
          return api.patch<ApiResponse<TRes>>(buildUrl(url, data), data);
        default:
          throw new Error("Invalid method");
      }
    },
    options,
    queryKey,
    updater
  );
};

export const usePostForm = <TOld, TNew extends FormData, TRes = unknown>(
  url: UrlBuilder<TNew>,
  params?: object,
  options?: MutationOptions<TRes, TNew>,
  updater?: (old: TOld, data: TNew) => TOld
) => {
  return useMutation<TOld, TNew, ApiResponse<TRes>>(
    (data) => api.postForm<ApiResponse<TRes>>(buildUrl(url, data), data),
    options,
    [url, params],
    updater
  );
};
