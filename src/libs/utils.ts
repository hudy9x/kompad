export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const isDesktopApp = () => {
  return !!window.__TAURI_METADATA__;
};

export const guidGenerator = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
