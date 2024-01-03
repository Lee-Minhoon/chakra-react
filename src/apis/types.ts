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

export type QueryKeyType = [string, Optional<object>];

export type QueryOptions<T> = UseQueryOptions<T, ApiError, T, QueryKeyType>;

export type PageQueryOptions<T> = UseQueryOptions<
  PageQueryResponse<T>,
  ApiError,
  PageQueryResponse<T>,
  QueryKeyType
>;

export type InfiniteQueryOptions<T> = UseInfiniteQueryOptions<
  CursorQueryResponse<T, number>,
  ApiError,
  CursorQueryResponse<T, number>,
  CursorQueryResponse<T, number>,
  QueryKeyType
>;

export type MutationOptions<T, S> = UseMutationOptions<
  ApiResponse<T>,
  ApiError,
  S
>;
