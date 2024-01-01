import { Nullable } from "@/types";

export const hasScroll = (elem?: Nullable<HTMLElement>) => {
  if (!elem) return false;
  return elem.scrollHeight > elem.clientHeight;
};

export const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
