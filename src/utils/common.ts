export const sleep = (ms: number) => {
  const wakeUpTime = Date.now() + 1000;
  while (Date.now() < wakeUpTime) {}
};
