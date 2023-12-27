export const toTitle = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const fillZero = (num: number, len: number) => {
  return num.toString().padStart(len, "0");
};

export const getRandomString = (len: number) => {
  return Math.random().toString(36).substring(2, len);
};

export const getRandomEmail = () => {
  return `${getRandomString(10)}@gmail.com`;
};

export const getRandomPhoneNumber = () => {
  let phoneNumber = "010-";
  phoneNumber += fillZero(Math.floor(Math.random() * 10000), 4).toString();
  phoneNumber += "-";
  phoneNumber += fillZero(Math.floor(Math.random() * 10000), 4).toString();
  return phoneNumber;
};
