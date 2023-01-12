export interface ConfirmFCProps {
  title: string;
  desc: string;
  yes: () => void;
  no?: () => void;
}

export type RenderFunc = {
  title: string,
  container: HTMLElement,
  desc: string,
  yes: () => void,
  no?: () => void,
}

export enum EConfirmBoxType {
  DANGER,
  INFO
}
