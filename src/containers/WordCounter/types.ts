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
 isOpenWordCount: boolean;
 selectedWordCount: IWordCounter;
 setIsOpenWordCount: Dispatch<SetStateAction<boolean>>;
 setSelectedWordCount: Dispatch<SetStateAction<IWordCounter>>;
}

export interface IWordCounter {
 count: string | number,
 text: string
}