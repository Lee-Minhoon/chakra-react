export interface Alert {
  title: string;
  message: string;
}

export interface Confirm {
  title: string;
  message: string;
  onConfirm?: () => void;
}
