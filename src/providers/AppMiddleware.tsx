import useKms from "../hooks/useKms"

export default function AppMiddleware({children}: {children: JSX.Element | JSX.Element[]}) {
  useKms()
  return <>{children}</>
}
