import { Optional } from "@/types";
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export class ApiError extends Error {
  private _status: number;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

export type ID = number;

export interface Scheme {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export type PageQueryParams = {
  page: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
};

export type CursorQueryParams = {
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
};

export interface PageQueryResponse<T> {
  total: number;
  data: T;
}

export interface CursorQueryResponse<T, S> {
  previous: S;
  next: S;
  data: T;
}

export type UrlBuilder<T> = string | ((data: T) => string);

export type QueryKey<T = void> = [UrlBuilder<T>, Optional<object>];

export type QueryOptions<T> = UseQueryOptions<T, ApiError, T, QueryKey>;

export type PageQueryOptions<T, S = PageQueryResponse<T>> = UseQueryOptions<
  S,
  ApiError,
  S,
  QueryKey
>;

export type InfiniteQueryOptions<
  T,
  S = CursorQueryResponse<T, number>,
> = UseInfiniteQueryOptions<S, ApiError, S, S, QueryKey>;

export type MutationOptions<T, S> = UseMutationOptions<
  ApiResponse<T>,
  ApiError,
  S
>;
