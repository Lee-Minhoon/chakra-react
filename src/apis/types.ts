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
}

export type OffsetQueryParams = {
  offset: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
};

export type CursorQueryParams = {
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
};

export interface OffsetQueryData<T> {
  total: number;
  data: T;
}

export interface CursorQueryData<T, S> {
  previous: S;
  next: S;
  data: T;
}
