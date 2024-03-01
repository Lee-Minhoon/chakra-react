import { useShallow } from "@/hooks";
import { Nullable } from "@/types";
import { ReactNode } from "react";
import { create } from "zustand";

interface Modal<T> {
  modal: React.FC<T>;
  props: T;
}

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
  modals: Modal<any>[];
  alert: Nullable<Alert>;
  confirm: Nullable<Confirm>;

  openModal: <T>(modal: React.FC<T>, props: Omit<T, "onClose">) => void;
  openAlert: (alert: Alert) => void;
  openConfirm: (confirm: Confirm) => void;

  closeModal: (modal: React.FC) => void;
  closeAlert: () => void;
  closeConfirm: () => void;
}

export const modalStore = create<T>((set) => ({
  modals: [],
  alert: null,
  confirm: null,

  openModal: (modal, props) =>
    set((state) => ({ modals: [...state.modals, { modal, props }] })),
  openAlert: (alert) => set({ alert }),
  openConfirm: (confirm) => set({ confirm }),

  closeModal: (modal) =>
    set((state) => ({ modals: state.modals.filter((m) => m.modal !== modal) })),
  closeAlert: () => set({ alert: null }),
  closeConfirm: () => set({ confirm: null }),
}));

export const useModalStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(modalStore, keys);
};
