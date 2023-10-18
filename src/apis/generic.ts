import { QueryParams } from "@/types";
import { ApiError, ApiResponse, api } from "@/utils";
import {
  MutationFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation as _useMutation,
  useQuery as _useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const useQuery = <TResponse>(
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TResponse, ApiError, TResponse, readonly unknown[]>
) => {
  return _useQuery<TResponse, ApiError>(
    [url, params],
    () => api.get<ApiResponse<TResponse>>(url, params).then((res) => res.data),
    options
  );
};

const useMutation = <TOldData, TNewData, TResponse>(
  mutationFn: MutationFunction<TResponse, TNewData>,
  url: string,
  params?: unknown,
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

export const useGet = <TResponse>(
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TResponse, ApiError, TResponse, readonly unknown[]>
) => {
  return useQuery<TResponse>(url, params, options);
};

export const usePost = <TOldData, TNewData, TResponse = unknown>(
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

export const useUpdate = <TOldData, TNewData, TResponse = unknown>(
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
