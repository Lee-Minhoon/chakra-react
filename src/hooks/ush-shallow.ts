import { StoreApi, UseBoundStore } from "zustand";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

const useShallow = <T, K extends keyof T>(
  store: UseBoundStore<StoreApi<T>>,
  keys: K[]
): Pick<T, K> => {
  return useStoreWithEqualityFn(
    store,
    (state) =>
      keys.reduce(
        (prev, curr) => {
          prev[curr] = state[curr];
          return prev;
        },
        {} as Pick<T, K>
      ),
    shallow
  );
};

export default useShallow;
