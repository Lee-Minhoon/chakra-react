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

export interface Scheme {
  id: number;
}

export type OffsetQueryParams = {
  offset: number;
  limit: number;
};

export type CursorQueryParams = {
  limit: number;
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
