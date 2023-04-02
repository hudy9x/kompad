export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

export const isDesktopApp = () => {
  return !!window.__TAURI_METADATA__
}

export const guidGenerator = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  )
}

export const timeStrToSec = (time: string) => {
  time = time.trim()
  const matched = time.match(/((?<time>\d+)(?<type>[smh]+))/i)

  if (!matched || !matched.groups) {
    return 0
  }

  const group = matched.groups
  const type =
    group.type === "h" ? 1000 * 60 * 60 : group.type === "m" ? 1000 * 60 : 1000
  return parseInt(group.time, 10) * type
}

export const timeNumberToStr = (time: number) => {
  let t = time / 1000

  if (t <= 0) return "0s"

  if (t <= 60) return `${t}s`

  let m = t / 60

  if (t / 60 <= 59) return `${m}m`

  let h = m / 60

  return `${h}h`
}

export const toMb = (byte: number, toPrecision?: number) => {
  toPrecision = toPrecision || 4
  return (byte / 1024 / 1024).toPrecision(toPrecision)
}
