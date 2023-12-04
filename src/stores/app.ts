import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "./hooks";

interface T {
  layout: "horizontal" | "vertical";

  toggleLayout: () => void;
}

export const appStore = create<T>()(
  persist(
    (set) => ({
      layout: "vertical",

      toggleLayout: () =>
        set((state) => ({
          layout: state.layout === "vertical" ? "horizontal" : "vertical",
        })),
    }),
    {
      name: "appStore",
    }
  )
);

export const useAppStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(appStore, keys);
};
