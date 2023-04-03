import React, { useEffect, useRef, useState } from "react"

export default function CommandPalletes() {
  const [visible, setvisible] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onTrigger = (ev: KeyboardEvent) => {
      const key = ev.key
      const isModalOpened = document.querySelector("#headlessui-portal-root")

      if (isModalOpened) {
        return
      }

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
    const target = ev.target as HTMLInputElement
    const value = target.value

    if (key !== "enter") {
      return
    }

    // setvisible(false)
    const commands = [
      "doc",
      "doc document",
      'doc --title "Document 1"',
      "doc -t hello2",
      "doc --title hello --folder HR",
      'doc --title doc1 --tag auth --folder "Video Scripts"',
      'doc --edit "new document title"',

      "dup",
      "important",

      'filter --tag auth,aws-s3 --folder "Recruiment"',

      "folder newFolder",
      'folder "mobile app"',

      "tag android",
      "tag android,ios",
      'tag "dall-e, công thức"',
    ]
    console.log(value)
  }

  return (
    <div
      className={`fixed w-full h-screen flex bg-gray-500/30 items-center justify-center px-2 py-2 z-[200] transition-all ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-[500px] bg-dark text-color-base rounded-lg shadow-lg border border-color-base flex items-center ">
        <span className="pl-3">$</span>
        <input
          ref={ref}
          type="text"
          onKeyDown={onPressEnter}
          className="w-full pl-1.5 bg-transparent border-transparent text-sm h-10 text-white focus:border-none focus:ring-0"
        />
      </div>
    </div>
  )
}
