export const setCacheJSON = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const setCache = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getCacheArray = (key: string) => {
  const value = JSON.parse(localStorage.getItem(key) || "[]");
  return value.length ? value : null;
};

export const getCacheJSON = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const getCache = (key: string) => {
  return localStorage.getItem(key);
};
