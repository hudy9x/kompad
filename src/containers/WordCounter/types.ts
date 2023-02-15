import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction } from "react";

export enum WordCounterText {
 Minutes = 'Minutes',
 Lines = 'Lines',
 Words = 'Words',
 Characters = 'Characters'
}

export interface ProviderProps {
 editor: Editor;
 visible: boolean;
 setVisible: Dispatch<SetStateAction<boolean>>;
 counter: IWordCounter;
 setCounter: Dispatch<SetStateAction<IWordCounter>>;
}

export interface IWordCounter {
 count: string | number,
 text: string
}
