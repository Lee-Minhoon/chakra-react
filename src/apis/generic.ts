import { QueryKey } from "@/constants";
import { QueryParams } from "@/types";
import { api } from "@/utils";
import {
  MutationFunction,
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

const useMutation = <TOldData, TNewData, TResponse>(
  mutationFn: MutationFunction<TResponse, TNewData>,
  queryKey: string | string[],
  params?: unknown,
  updater?: (old: TOldData, data: TNewData) => any
) => {
  const queryClient = useQueryClient();

  return _useMutation<TResponse, unknown, TNewData>(mutationFn, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([queryKey, params]);
      const previousData = queryClient.getQueryData([queryKey, undefined]);
      queryClient.setQueryData<TOldData>([queryKey, params], (old) => {
        return updater ? updater(old!, data) : old;
      });
      return previousData;
    },
    onError: (err, data, context) => {
      queryClient.setQueryData([queryKey, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey, params]);
    },
  });
};

export const useGet = <TResponse, TError = unknown>(
  queryKey: QueryKey,
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TResponse, TError, TResponse, readonly unknown[]>
) => {
  return useQuery<TResponse, TError>(queryKey, url, params, options);
};

export const usePost = <TOldData, TNewData, TResponse = unknown>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse>(
    (data) => api.post<TResponse>(url, data),
    queryKey,
    params,
    updater
  );
};

export const useUpdate = <TOldData, TNewData, TResponse = unknown>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  updater?: (old: TOldData, data: TNewData) => TOldData
) => {
  return useMutation<TOldData, TNewData, TResponse>(
    (data) => api.put<TResponse>(url, data),
    queryKey,
    params,
    updater
  );
};

export const useDelete = <TOldData, TResponse, TId = number>(
  queryKey: QueryKey,
  url: string,
  params?: object,
  updater?: (old: TOldData, id: TId) => TOldData
) => {
  return useMutation<TOldData, TId, TResponse>(
    (id) => api.delete<TResponse>(`${url}/${id}`),
    queryKey,
    params,
    updater
  );
};
