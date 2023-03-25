import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function LockScreenTimer({ visible }: { visible: boolean }) {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    let t = 0

    t = setInterval(() => {
      setDate(new Date())
    }, 1000 * 60) as unknown as number

    return () => {
      clearInterval(t)
    }
  }, [])

  const d = dayjs(date)

  return (
    <div
      className={`lock-screen-timer transition-all text-color-base text-center ${
        visible ? "" : "fixed opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-[110px] font-medium">{d.format("HH:mm")}</div>
      <div className="text-[35px] font-thin">{d.format("ddd, MMM DD")}</div>
    </div>
  )
}
