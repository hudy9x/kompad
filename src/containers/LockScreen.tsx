import { useEffect, useState } from "react"

export default function LockScreen() {
  const [locked, setLocked] = useState(false)
  useEffect(() => {
    let t = 0
    const events = [
      "scroll",
      "keydown",
      "mousedown",
      "mousemove",
      "click",
      "touchmove",
      "touchstart",
      "load",
    ]
    const lockScreen = (status: boolean) => {
      setLocked(status)
    }

    const resetTimer = () => {
      console.log("reset timeer =======================")
      t && clearTimeout(t)

      if (locked) return
      console.log("start counting")

      t = setTimeout(() => {
        console.log("locking")
        lockScreen(true)
      }, 5000) as unknown as number
    }

    const unlock = (ev: KeyboardEvent) => {
      const key = ev.key
      if (key.toLowerCase() === "l" && ev.ctrlKey) {
        lockScreen(false)
        resetTimer()
      }
    }

    !locked && resetTimer()

    events.forEach((ev) => {
      window.addEventListener(ev, resetTimer)
    })

    window.addEventListener("keydown", unlock)

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, resetTimer)
      })
      window.removeEventListener("keydown", unlock)
    }
  }, [])
  return (
    <div
      className={`lock-screen fixed z-10 top-0 left-0 w-full h-full overflow-hidden bg-black/30 backdrop-blur-2xl transition-all duration-700 ${
        locked ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    ></div>
  )
}
