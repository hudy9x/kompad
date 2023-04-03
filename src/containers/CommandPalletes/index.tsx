import React, { useEffect, useRef, useState } from "react"

enum ECommandType {
  COMMAND = "COMMAND",
  OPTION = "OPTION",
  CONTENT = "CONTENT",
}
interface ICommand {
  type: ECommandType
  text: string
}

export default function CommandPalletes() {
  const [visible, setvisible] = useState(false)
  const [inputs, setInputs] = useState<ICommand[]>([])
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

  const onKeyPressed = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key.toLowerCase()
    const target = ev.target as HTMLInputElement
    const value = target.value

    if (key === "backspace" && !value) {
      setInputs((inps) => inps.slice(0, -1))
      return
    }

    if (key.match(/^\s+$/)) {
      let type = ECommandType.CONTENT
      const isCommand = !inputs.length ? "command" : ""
      const isOption = value.match(/^-+/) ? "option" : ""

      if (isCommand) {
        type = ECommandType.COMMAND
      }

      if (isOption) {
        type = ECommandType.OPTION
      }

      setInputs((inp) => [
        ...inp,
        {
          type,
          text: value.trim(),
        },
      ])
      target.value = ""
      return
    }

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
        {inputs.length ? (
          <div className="flex items-center gap-3">
            {inputs.map((inp) => {
              return <span>{inp.text}</span>
            })}{" "}
          </div>
        ) : null}
        <input
          ref={ref}
          type="text"
          onKeyDown={onKeyPressed}
          className="w-full pl-1.5 bg-transparent border-transparent text-sm h-10 text-white focus:border-none focus:ring-0"
        />
      </div>
    </div>
  )
}
