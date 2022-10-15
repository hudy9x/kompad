import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
  height: string;
  children: JSX.Element | JSX.Element[]
}

export default function ScrollBar({ height, children }: Props) {
  return <Scrollbars style={{ height }}>{children}</Scrollbars>
}
