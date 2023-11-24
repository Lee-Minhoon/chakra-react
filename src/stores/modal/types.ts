import { ReactNode } from "react";

export interface Alert {
  title: string;
  content: ReactNode;
}

export interface Confirm {
  title: string;
  content: ReactNode;
  onConfirm?: () => void;
}
