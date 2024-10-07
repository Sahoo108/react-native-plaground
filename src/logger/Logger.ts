export const debugLog = <T>(tag: string, t: T): void => {
  if (!__DEV__) {
    return;
  }

  console.log(tag, String(t));
};

export const debugError = <T>(tag: string, t: T): void => {
  if (!__DEV__) {
    return;
  }

  console.error(tag, String(t));
};
