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

export interface InfiniteQueryData<T, S> {
  previous: S;
  next: S;
  data: T;
}

export type CursorQueryParams = {
  limit: number;
};
