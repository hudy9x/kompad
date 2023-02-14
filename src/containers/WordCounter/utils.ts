import { Editor } from "@tiptap/react";

const WORDS_PER_MINUTE = 200;

export const calWords = (editor: Editor): string => {
 return editor.storage.characterCount.words().toLocaleString("vi-VN", { maximumFractionDigits: 0 });
}

export const calChar = (editor: Editor): string => {
 return editor.storage.characterCount.characters().toLocaleString("vi-VN", { maximumFractionDigits: 0 });
}

export const calLines = (editor: Editor): string => {
 return editor.getText().split("\n").length.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
}

export const calMins = (editor: Editor) => {
 const minutes = editor.getText().split("\n").length / WORDS_PER_MINUTE;
 const roundedMinutes = editor.getText() === "" ? 0 : minutes <= 1 ? 1 : Math.round(minutes);
 return Math.round(roundedMinutes);
}
