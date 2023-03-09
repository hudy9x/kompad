import useKms from "../hooks/useKms"

export default function AppMiddleware({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  const { hasSecretKey } = useKms()
  return <>{hasSecretKey ? children : null}</>
}
