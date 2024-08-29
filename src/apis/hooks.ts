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
import { AxiosError } from "axios";
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
import { Api, buildQueryKey, buildUrl } from "./utils";

const fetcher = async <TResponse>(context: QueryFunctionContext<QueryKey>) => {
  const { queryKey, pageParam } = context;
  const [url, params] = queryKey;
  return Api.get<ApiResponse<TResponse>>(
    buildUrl(url, undefined),
    pageParam !== undefined ? { ...params, cursor: pageParam } : { ...params }
  ).then((res) => res.data);
};

const useQuery = <TResponse>(
  url: Nullable<string>,
  params?: object,
  options?: QueryOptions<TResponse>
) => {
  return _useQuery<TResponse, AxiosError<ApiError>, TResponse, QueryKey>(
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
  options?: InfiniteQueryOptions<TResponse>
) => {
  return _useInfiniteQuery<
    CursorQueryResponse<TResponse>,
    AxiosError<ApiError>,
    CursorQueryResponse<TResponse>,
    QueryKey
  >(
    [url!, params],
    ({ pageParam = 0, ...rest }) =>
      fetcher<CursorQueryResponse<TResponse>>({ pageParam, ...rest }),
    {
      ...options,
      getPreviousPageParam: (firstPage) => firstPage.previous,
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
};

export const useMutation = <TCached, TRequest, TResponse>(
  mutationFn: MutationFunction<TResponse, TRequest>,
  options?: UseMutationOptions<TResponse, AxiosError<ApiError>, TRequest>,
  queryKey?: QueryKey<TRequest>,
  updater?: (old: TCached, data: TRequest) => Optional<TCached>
) => {
  const queryClient = useQueryClient();

  return _useMutation<TResponse, AxiosError<ApiError>, TRequest>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      options?.onMutate?.(variables);
      if (!queryKey) return;
      const builtQueryKey = buildQueryKey(queryKey, variables);
      console.log("The mutation has been executed.", builtQueryKey);

      // Optimistic update(does not run if query key is not present)
      await queryClient.cancelQueries(builtQueryKey);
      const previousData = queryClient.getQueryData(builtQueryKey);
      queryClient.setQueryData<TCached>(queryKey, (old) => {
        old && updater && console.log("Optimistic updates are run.", queryKey);
        return old && updater ? updater(old, variables) : old;
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      if (!queryKey) return;

      // If an error occurs, it returns to old data.
      queryClient.setQueryData(buildQueryKey(queryKey, variables), context);
    },
    onSettled: (data, err, variables, context) => {
      options?.onSettled?.(data, err, variables, context);
      if (!queryKey) return;

      // Invalidates the query.
      const queryKeyToInvalidate = buildQueryKey(queryKey, variables);
      console.log("The query has been invalidated.", queryKeyToInvalidate);
      queryClient.invalidateQueries(queryKeyToInvalidate);
    },
  });
};

/**
 * @example
 * url: "/api/users/1"
 * params: undefined
 * request: "/api/users/1"
 * queryKey: ["/api/users/1", undefined]
 * @description Fetch data
 * @param url Request URL
 * @param params Query parameters
 * @param options Query options
 * @returns Query result
 */
export const useFetch = <TResponse>(
  url: string,
  params?: object,
  options?: QueryOptions<TResponse>
) => {
  return useQuery<TResponse>(url, params, options);
};

/**
 * @example
 * url: "/api/users"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/users?page=1&limit=10&sort=id&order=desc&search="
 * queryKey: ["/api/users", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Fetch data by page
 * @param url Request URL
 * @param params Query parameters
 * @param options Query options
 * @returns Query result
 */
export const useGetPage = <TResponse>(
  url: string,
  params?: object,
  options?: PageQueryOptions<TResponse>
) => {
  return useQuery<PageQueryResponse<TResponse>>(url, params, {
    ...options,
    keepPreviousData: true,
  });
};

/**
 * @example
 * url: "/api/users"
 * params: { limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/users?limit=10&sort=id&order=desc&search="
 * queryKey: ["/api/users", { limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Fetch data by cursor
 * @param url Request URL
 * @param params Query parameters
 * @param options Query options
 * @returns Infinite query result
 */
export const useLoadMore = <TResponse>(
  url: string,
  params?: object,
  options?: InfiniteQueryOptions<TResponse>
) => {
  return useInfiniteQuery<TResponse>(url, params, options);
};

/**
 * @example
 * url: "/api/users"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/users"
 * invalidate queryKey: ["/api/users", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Request to post data
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const usePost = <
  TCached,
  TRequest extends object | void = void,
  TResponse = unknown,
>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => Api.post<ApiResponse<TResponse>>(buildUrl(url, data), data ?? {}),
    options,
    [url, params],
    updater
  );
};

/**
 * @example
 * url: "/api/users/1"
 * params: undefined
 * request: "/api/users/1"
 * invalidate queryKey: ["/api/users/1", undefined]
 * @description Request to update data in the detail view
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns
 */
export const useUpdate = <
  TCached,
  TRequest extends object & { id?: ID },
  TResponse = unknown,
>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => Api.put<ApiResponse<TResponse>>(buildUrl(url, data), data),
    options,
    [url, params],
    updater
  );
};

/**
 * @example
 * url: "/api/users"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/users/1"
 * invalidate queryKey: ["/api/users", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Request to update data in the list view
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const useUpdateInList = <
  TCached,
  TRequest extends object & { id?: ID },
  TResponse = unknown,
>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => {
      const { id, ...rest } = data;
      const builtUrl = buildUrl(url, data);
      return Api.put<ApiResponse<TResponse>>(
        id ? `${builtUrl}/${id}` : builtUrl,
        rest
      );
    },
    options,
    [url, params],
    updater
  );
};

/**
 * @example
 * url: "/api/users"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/users/1"
 * invalidate queryKey: ["/api/users", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Request to delete data
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const useDelete = <TCached, TRequest = ID | void, TResponse = unknown>(
  url: string,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, id: TRequest) => TCached
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (id) => Api.delete<ApiResponse<TResponse>>(id ? `${url}/${id}` : url),
    options,
    [url, params],
    updater
  );
};

/**
 * @description Request to post form data
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const usePostForm = <
  TCached,
  TRequest extends FormData,
  TResponse = unknown,
>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => Api.postForm<ApiResponse<TResponse>>(buildUrl(url, data), data),
    options,
    [url, params],
    updater
  );
};

/**
 * @example
 * url: "/api/users/1/approve"
 * queryKey: ["/api/users", undefined]
 * request: "/api/users/1/approve"
 * invalidate queryKey: ["/api/users", undefined]
 * @description Send a command to the server
 * @param url Request URL
 * @param queryKey Query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @param method Request method
 * @returns Mutation result
 */
export const useCommand = <
  TCached,
  TRequest extends object & { id: ID },
  TResponse = unknown,
>(
  url: UrlBuilder<TRequest>,
  queryKey?: QueryKey<TRequest>,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached,
  method: "POST" | "PUT" | "PATCH" = "POST"
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => {
      switch (method) {
        case "POST":
          return Api.post<ApiResponse<TResponse>>(buildUrl(url, data), data);
        case "PUT":
          return Api.put<ApiResponse<TResponse>>(buildUrl(url, data), data);
        case "PATCH":
          return Api.patch<ApiResponse<TResponse>>(buildUrl(url, data), data);
        default:
          throw new Error("Invalid method");
      }
    },
    options,
    queryKey,
    updater
  );
};

export const useInvalidateQueries = (url: string, params?: object) => {
  const queryClient = useQueryClient();
  const queryKeyToInvalidate = params ? [url, params] : [url];

  return () => {
    console.log("The query has been invalidated.", queryKeyToInvalidate);
    queryClient.invalidateQueries(queryKeyToInvalidate);
  };
};

export const useResetQueries = (url: string, params?: object) => {
  const queryClient = useQueryClient();
  const queryKeyToReset = params ? [url, params] : [url];

  return () => {
    console.log("The query has been reset.", queryKeyToReset);
    queryClient.resetQueries(queryKeyToReset);
  };
};
