export interface ConfirmFCProps {
  title: string;
  desc: string;
  yes: () => void;
  no?: () => void;
  isHiddenClose?: boolean
}

export type RenderFunc = {
  title: string,
  container: HTMLElement,
  desc: string,
  yes: () => void,
  no?: () => void,
  isHiddenClose?: boolean
}
