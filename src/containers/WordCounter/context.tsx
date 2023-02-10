import { Editor } from "@tiptap/react";
import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { WordCounter } from ".";

export interface ProviderProps {
  editor: Editor;
  wordCounter: WordCounter[];
  isOpenWordCount: boolean;
  selectedWordCount: WordCounter;
  setIsOpenWordCount: Dispatch<SetStateAction<boolean>>;
  setSelectedWordCount: Dispatch<SetStateAction<WordCounter>>;
}

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
