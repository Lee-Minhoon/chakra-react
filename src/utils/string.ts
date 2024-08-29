export const fillZero = (num: number, length: number) => {
  return num.toString().padStart(length, "0");
};

export const randomString = (length: number) =>
  Array.from({ length }, () => Math.random().toString(36).charAt(2)).join("");

export const includesIgnoreCase = (str: string, keyword: string) => {
  return str.toLowerCase().includes(keyword.toLowerCase());
};
