import { Nullable, Optional } from "@/types";
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
}

export const isApiResponse = <T = unknown>(
  data: any
): data is ApiResponse<T> => {
  return "data" in data && "message" in data;
};

export interface ApiError<T = null> extends Error {
  data: T;
  message: string;
}

export type ID = number;

export interface Scheme {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export type Order = "asc" | "desc";

export type PageQueryParams = {
  page: number;
  limit: number;
  sort?: string;
  order?: Order;
  search?: string;
};

export type CursorQueryParams = {
  limit: number;
  sort?: string;
  order?: Order;
  search?: string;
};

export interface PageQueryResponse<T> {
  total: number;
  data: T[];
}

export interface CursorQueryResponse<T> {
  previous: Nullable<number>;
  next: Nullable<number>;
  data: T[];
}

export type UrlBuilder<T> = string | ((data: T) => string);

export type QueryKey<T = void> = [UrlBuilder<T>, Optional<object>];

export type QueryOptions<T> = UseQueryOptions<
  T,
  AxiosError<ApiError>,
  T,
  QueryKey
>;

export type PageQueryOptions<T, S = PageQueryResponse<T>> = UseQueryOptions<
  S,
  AxiosError<ApiError>,
  S,
  QueryKey
>;

export type InfiniteQueryOptions<
  T,
  S = CursorQueryResponse<T>,
> = UseInfiniteQueryOptions<S, AxiosError<ApiError>, S, S, QueryKey>;

export type MutationOptions<T, S> = UseMutationOptions<
  ApiResponse<T>,
  AxiosError<ApiError>,
  S
>;
