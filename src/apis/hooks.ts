import { Nullable, Optional } from "@/types";
import {
  MutationFunction,
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery as _useInfiniteQuery,
  useMutation as _useMutation,
  useQuery as _useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError, ApiResponse, InfiniteQueryData, api } from ".";

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
  params?: object
) => {
  return _useInfiniteQuery<
    InfiniteQueryData<TResponse, number>,
    ApiError,
    InfiniteQueryData<TResponse, number>,
    QueryKeyType
  >(
    [url!, params],
    ({ pageParam = 1, ...rest }) =>
      fetcher<InfiniteQueryData<TResponse, number>>({ pageParam, ...rest }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? false,
      getNextPageParam: (lastPage) => {
        console.log(lastPage.next, !!lastPage.next);
        return lastPage.next ?? false;
      },
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
        return updater ? updater(old!, variables) : old;
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

export const useLoadMore = <TResponse>(url: string, params?: object) => {
  return useInfiniteQuery<TResponse>(url, params);
};

export const useGet = <TResponse>(
  url: string,
  params?: object,
  options?: UseQueryOptions<TResponse, ApiError, TResponse, QueryKeyType>
) => {
  return useQuery<TResponse>(url, params, options);
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
