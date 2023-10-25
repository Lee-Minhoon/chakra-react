export interface Alert {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface Confirm {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
