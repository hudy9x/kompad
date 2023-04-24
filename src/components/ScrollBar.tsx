import { Scrollbars, ScrollbarProps } from "react-custom-scrollbars-2"

interface Props extends ScrollbarProps {
  height: string
  className?: string
  autoHide?: boolean
  children: JSX.Element | JSX.Element[]
  onUpdate?: ({ scrollTop }: { scrollTop: number }) => void
}

export default function ScrollBar({
  height,
  className,
  children,
  onUpdate,
  onScroll,
  autoHide = true,
  ...rest
}: Props) {
  return (
    <Scrollbars
      onUpdate={onUpdate}
      onScroll={onScroll}
      className={className || ""}
      autoHide={autoHide}
      style={{ height }}
      {...rest}
    >
      {children}
    </Scrollbars>
  )
}
