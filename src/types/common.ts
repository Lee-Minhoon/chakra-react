export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type RequiredKeys<T> = Exclude<
  {
    [K in keyof T]: undefined extends T[K] ? never : K;
  }[keyof T],
  undefined
>;
