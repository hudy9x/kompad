import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
  height: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
  onUpdate?: ({ scrollTop }: {
    scrollTop: number
  }) => void
}

export default function ScrollBar({ height, className, children, onUpdate }: Props) {
  return <Scrollbars onUpdate={onUpdate} className={className || ''} autoHide style={{ height }} >{children}</Scrollbars>
}
