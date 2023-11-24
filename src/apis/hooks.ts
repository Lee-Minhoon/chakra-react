import { Nullable, Optional } from "@/types";
import {
  MutationFunction,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery as _useInfiniteQuery,
  useMutation as _useMutation,
  useQuery as _useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ApiError,
  ApiResponse,
  CursorQueryData,
  OffsetQueryData,
} from "./types";
import { api } from "./utils";

type QueryKeyType = [string, Optional<object>];

const fetcher = async <TResponse>(
  context: QueryFunctionContext<QueryKeyType>
) => {
  const { queryKey, pageParam } = context;
  const [url, params] = queryKey;
  return api
    .get<ApiResponse<TResponse>>(
      url!,
      pageParam !== undefined ? { ...params, cursor: pageParam } : { ...params }
    )
    .then((res) => res.data);
};

const useQuery = <TResponse>(
  url: Nullable<string>,
  params?: object,
  options?: UseQueryOptions<TResponse, ApiError, TResponse, QueryKeyType>
) => {
  return _useQuery<TResponse, ApiError, TResponse, QueryKeyType>(
    [url!, params],
    (context) => fetcher<TResponse>(context),
    {
      enabled: !!url,
      ...options,
    }
  );
};

const useInfiniteQuery = <TResponse>(
  url: Nullable<string>,
  params?: object,
  options?: UseInfiniteQueryOptions<
    CursorQueryData<TResponse, number>,
    ApiError,
    CursorQueryData<TResponse, number>,
    CursorQueryData<TResponse, number>,
    QueryKeyType
  >
) => {
  return _useInfiniteQuery<
    CursorQueryData<TResponse, number>,
    ApiError,
    CursorQueryData<TResponse, number>,
    QueryKeyType
  >(
    [url!, params],
    ({ pageParam = 1, ...rest }) =>
      fetcher<CursorQueryData<TResponse, number>>({ pageParam, ...rest }),
    {
      ...options,
      getPreviousPageParam: (firstPage) => firstPage.previous,
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
};

export const useMutation = <TOldData, TNewData, TResponse>(
  mutationFn: MutationFunction<TResponse, TNewData>,
  options?: UseMutationOptions<TResponse, ApiError, TNewData>,
  queryKey?: QueryKeyType,
  updater?: (old: TOldData, data: TNewData) => Optional<TOldData>
) => {
  const queryClient = useQueryClient();

  return _useMutation<TResponse, ApiError, TNewData>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      options?.onMutate?.(variables);
      if (!queryKey) return;

      // 낙관적 업데이트(쿼리 키가 없으면 실행되지 않음)
      // Optimistic update(does not run if query key is not present)
      await queryClient.cancelQueries(queryKey);
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData<TOldData>(queryKey, (old) => {
        return old && updater ? updater(old, variables) : old;
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      if (!queryKey) return;

      // 에러가 발생할 경우 이전 데이터로 되돌립니다.
      // If an error occurs, it returns to old data.
      queryClient.setQueryData(queryKey, context);
    },
    onSettled: (data, err, variables, context) => {
      options?.onSettled?.(data, err, variables, context);
      if (!queryKey) return;
      queryClient
        .getQueryCache()
        .findAll([queryKey[0]])
        .forEach((queryKey) => queryClient.invalidateQueries(queryKey));
    },
  });
};

export const useFetch = <TResponse>(
  url: string,
  params?: object,
  options?: UseQueryOptions<TResponse, ApiError, TResponse, QueryKeyType>
) => {
  return useQuery<TResponse>(url, params, options);
};

export const useGetPage = <TResponse>(
  url: string,
  params?: object,
  options?: UseQueryOptions<
    OffsetQueryData<TResponse>,
    ApiError,
    OffsetQueryData<TResponse>,
    QueryKeyType
  >
) => {
  return useQuery<OffsetQueryData<TResponse>>(url, params, {
    ...options,
    keepPreviousData: true,
  });
};

export const useLoadMore = <TResponse>(
  url: string,
  params?: object,
  options?: UseInfiniteQueryOptions<
    CursorQueryData<TResponse, number>,
    ApiError,
    CursorQueryData<TResponse, number>,
    CursorQueryData<TResponse, number>,
    QueryKeyType
  >
) => {
  return useInfiniteQuery<TResponse>(url, params, options);
};

export const usePost = <TOldData, TNewData extends object, TResponse = unknown>(
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, ApiError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse>(
    (data) => api.post<TResponse>(url, data),
    options,
    [url, params],
    updater
  );
};

export const useUpdate = <
  TOldData,
  TNewData extends object & { id?: number },
  TResponse = unknown,
>(
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, ApiError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse>(
    (data) => {
      const { id, ...rest } = data;
      return api.put<TResponse>(id ? `${url}/${id}` : url, rest);
    },
    options,
    [url, params],
    updater
  );
};

export const useDelete = <TOldData, TResponse, TId = number>(
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, ApiError, TId>,
  updater?: (old: TOldData, id: TId) => TOldData
) => {
  return useMutation<TOldData, TId, TResponse>(
    (id) => api.delete<TResponse>(`${url}/${id}`),
    options,
    [url, params],
    updater
  );
};
