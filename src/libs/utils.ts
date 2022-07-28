export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const isDesktopApp = () => {
  return !!window.__TAURI_METADATA__;
};
