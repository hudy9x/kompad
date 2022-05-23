export type MessageFunc = (content: string, timeout?: number) => void;

export type MessageCreateFunc = (
  type: string,
  content: string,
  timeout?: number
) => void;

export type MessageClearFuncRetType = {
  root: null;
  container: HTMLElement;
};

export interface MessageFCProps {
  type: string;
  content: string;
}
