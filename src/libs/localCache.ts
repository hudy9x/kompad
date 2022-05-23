export const setCache = (key: string, value: unknown) => {
  // if (value === null || value === undefined) {
  //   throw new Error("value is not empty");
  // }

  localStorage.setItem(key, JSON.stringify(value));
};

export const getCacheArray = (key: string) => {
  const value = JSON.parse(localStorage.getItem(key) || "[]");
  return value.length ? value : null;
};

export const getCacheJSON = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};
