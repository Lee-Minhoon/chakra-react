import { QueryKey } from "@/constants";
import { QueryParams } from "@/types";
import { api } from "@/utils";
import {
  MutationFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation as _useMutation,
  useQuery as _useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface Response<T> {
  data: T;
  message: string;
}

type Error = unknown;

const useQuery = <TResponse, TError = Error>(
  queryKey: QueryKey,
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TResponse, TError, TResponse, readonly unknown[]>
) => {
  return _useQuery<TResponse, TError>(
    [queryKey, params],
    () => api.get<Response<TResponse>>(url, params).then((res) => res.data),
    options
  );
};

const useMutation = <TOldData, TNewData, TResponse, TError = Error>(
  mutationFn: MutationFunction<TResponse, TNewData>,
  queryKey: string | string[],
  params?: unknown,
  options?: UseMutationOptions<TResponse, TError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => any
) => {
  const queryClient = useQueryClient();

  return _useMutation<TResponse, TError, TNewData>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      options?.onMutate?.(variables);
      await queryClient.cancelQueries([queryKey, params]);
      const previousData = queryClient.getQueryData([queryKey, undefined]);
      queryClient.setQueryData<TOldData>([queryKey, params], (old) => {
        return updater ? updater(old!, variables) : old;
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData([queryKey, params], context);
    },
    onSettled: (data, err, variables, context) => {
      options?.onSettled?.(data, err, variables, context);
      queryClient.invalidateQueries([queryKey, params]);
    },
  });
};

export const useGet = <TResponse, TError = Error>(
  queryKey: QueryKey,
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TResponse, TError, TResponse, readonly unknown[]>
) => {
  return useQuery<TResponse, TError>(queryKey, url, params, options);
};

export const usePost = <
  TOldData,
  TNewData,
  TResponse = unknown,
  TError = Error,
>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, TError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse, TError>(
    (data) => api.post<TResponse>(url, data),
    queryKey,
    params,
    options,
    updater
  );
};

export const useUpdate = <
  TOldData,
  TNewData,
  TResponse = unknown,
  TError = Error,
>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, TError, TNewData>,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse, TError>(
    (data) => api.put<TResponse>(url, data),
    queryKey,
    params,
    options,
    updater
  );
};

export const useDelete = <TOldData, TResponse, TId = number, TError = Error>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  options?: UseMutationOptions<TResponse, TError, TId>,
  updater?: (old: TOldData, id: TId) => TOldData
) => {
  return useMutation<TOldData, TId, TResponse, TError>(
    (id) => api.delete<TResponse>(`${url}/${id}`),
    queryKey,
    params,
    options,
    updater
  );
};
