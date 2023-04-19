import { createContext, ReactNode } from "react";
import { ProviderProps } from "./types";

export const Context = createContext<ProviderProps | null>(null);

export const Provider = ({ children, props }: {
  children: ReactNode,
  props: ProviderProps
}) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};
