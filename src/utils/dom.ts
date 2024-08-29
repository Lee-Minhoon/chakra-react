export const remToPx = (rem: number | string) => {
  if (typeof rem === "string") rem = parseFloat(rem);
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
