import { Nullable } from "@/types";
import { create } from "zustand";
import { Alert, Confirm } from "./types";
import { useShallow } from "../hooks";

interface T {
  alert: Nullable<Alert>;
  confirm: Nullable<Confirm>;

  openAlert: (alert: Alert) => void;
  openConfirm: (confirm: Confirm) => void;

  closeAlert: () => void;
  closeConfirm: () => void;
}

const modalStore = create<T>((set) => ({
  alert: null,
  confirm: null,

  openAlert: (alert) => set({ alert }),
  openConfirm: (confirm) => set({ confirm }),

  closeAlert: () => set({ alert: null }),
  closeConfirm: () => set({ confirm: null }),
}));

export const useModalStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(modalStore, keys);
};
