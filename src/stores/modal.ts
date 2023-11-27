import { Nullable } from "@/types";
import { ReactNode } from "react";
import { create } from "zustand";
import { useShallow } from "./hooks";

interface Alert {
  title: string;
  content: ReactNode;
}

interface Confirm {
  title: string;
  content: ReactNode;
  onConfirm?: () => void;
}

interface T {
  alert: Nullable<Alert>;
  confirm: Nullable<Confirm>;

  openAlert: (alert: Alert) => void;
  openConfirm: (confirm: Confirm) => void;

  closeAlert: () => void;
  closeConfirm: () => void;
}

export const modalStore = create<T>((set) => ({
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
