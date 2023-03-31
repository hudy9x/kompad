import React, { useEffect, useRef, useState } from "react"

export default function CommandPalletes() {
  const [visible, setvisible] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onTrigger = (ev: KeyboardEvent) => {
      const key = ev.key

      if (key.toLowerCase() !== "escape") {
        return
      }

      setvisible(!visible)
    }
    document.addEventListener("keydown", onTrigger)
    return () => {
      document.removeEventListener("keydown", onTrigger)
    }
  }, [visible])

  useEffect(() => {
    if (visible && ref.current) {
      const input = ref.current

      input.value = ""
      setTimeout(() => {
        input.focus()
      }, 250)
    }
  }, [visible])

  const onPressEnter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key.toLowerCase()
    const value = ev.target.value

    if (key !== "enter") {
      return
    }

    setvisible(false)
    console.log(value)
  }

  console.log("visible", visible)

  return (
    <div
      className={`fixed w-full h-screen flex bg-gray-500/30 items-center justify-center px-2 py-2 z-[200] transition-all ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-[500px] bg-dark text-color-base rounded-lg shadow-lg border border-color-base">
        <input
          ref={ref}
          type="text"
          onKeyDown={onPressEnter}
          className="w-full bg-transparent border-transparent text-sm h-10 text-white focus:border-none focus:ring-0"
        />
      </div>
    </div>
  )
}
