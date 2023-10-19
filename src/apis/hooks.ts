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

const useMutation = <TOldData, TNewData, TResponse>(
  mutationFn: MutationFunction<TResponse, TNewData>,
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, ApiError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => any
) => {
  const queryClient = useQueryClient();

  return _useMutation<TResponse, ApiError, TNewData>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      options?.onMutate?.(variables);
      await queryClient.cancelQueries();
      const previousData = queryClient.getQueryData([url, params]);
      queryClient.setQueryData<TOldData>([url, params], (old) => {
        return old && updater ? updater(old, variables) : old;
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData([url, params], context);
    },
    onSettled: (data, err, variables, context) => {
      options?.onSettled?.(data, err, variables, context);
      queryClient.invalidateQueries([url, params]);
    },
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

export const useGet = <TResponse>(
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

export const usePost = <TOldData, TNewData extends object, TResponse = unknown>(
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, ApiError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse>(
    (data) => api.post<TResponse>(url, data),
    url,
    params,
    options,
    updater
  );
};

export const useUpdate = <
  TOldData,
  TNewData extends object,
  TResponse = unknown,
>(
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, ApiError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse>(
    (data) => api.put<TResponse>(url, data),
    url,
    params,
    options,
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
    url,
    params,
    options,
    updater
  );
};
