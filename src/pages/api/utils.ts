import { isProd } from "./db";

export const delayForDev = (ms: number) => {
  if (!isProd) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
};
