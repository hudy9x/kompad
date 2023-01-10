import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
  height: string;
  className?: string;
  children: JSX.Element | JSX.Element[]
}

export default function ScrollBar({ height, className, children }: Props) {
  return <Scrollbars className={className || ''} autoHide style={{ height }}>{children}</Scrollbars>
}
