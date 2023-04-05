import React, { useEffect, useRef, useState } from "react"
import { ECommandType, ICommand } from "../../types"
import { useCommand } from "./useCommand"

export default function CommandPalletes() {
  const [visible, setvisible] = useState(false)
  const [inputs, setInputs] = useState<ICommand[]>([])
  const ref = useRef<HTMLInputElement>(null)
  const { executeCommand, suggestKeyword } = useCommand()
  const [inpValue, setInpValue] = useState("")
  const [suggestList, setSuggestList] = useState<string[]>([])

  const insertInput = (type: ECommandType, value: string) => {
    setInputs((inp) => [
      ...inp,
      {
        type,
        text: value.trim(),
      },
    ])
  }

  const clearInput = (target: HTMLInputElement) => {
    target.value = ""
    setTimeout(() => {
      target.value = ""
    }, 50)
  }

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

      !visible === false && setInputs([])
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

  useEffect(() => {
    const suggestedKeywords = suggestKeyword(inputs, inpValue)
    console.log(suggestedKeywords)
    setSuggestList(suggestedKeywords || [])
  }, [inpValue, inputs])

  const onKeyPressed = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key.toLowerCase()
    const target = ev.target as HTMLInputElement
    const value = target.value
    const isSpace = key.match(/\s+$/)

    if (key === "backspace" && !value) {
      setInputs((inps) => inps.slice(0, -1))
      return
    }

    if (isSpace) {
      let type = ECommandType.CONTENT
      const isCommand = !inputs.length ? "command" : ""
      const isOption = value.match(/^-+/) ? "option" : ""

      const isString = value.match(/^".+"$/)

      if (isCommand) {
        type = ECommandType.COMMAND
        clearInput(target)
        insertInput(type, value)
      }

      if (isOption) {
        type = ECommandType.OPTION
        clearInput(target)
        insertInput(type, value)
      }

      return
    }

    const isIncludedOption = value.match(/\s+-+/)
    if (isIncludedOption) {
      // type = ECommandType.CONTENT

      const extractedValue = value.slice(0, -1).trim()
      target.value = "-"
      insertInput(ECommandType.CONTENT, extractedValue)
      console.log(value)
      return
    }

    if (key !== "enter") {
      return
    }

    // pressing Enter
    const commands = [
      ...inputs,
      {
        type: value.match(/^-+/) ? ECommandType.OPTION : ECommandType.CONTENT,
        text: value.trim(),
      },
    ]
    executeCommand(commands)
    setInputs([])
    setvisible(false)
  }

  console.log("inputValue", inpValue)

  return (
    <div
      className={`command-pallete  ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-[500px] relative bg-dark text-color-base rounded-lg shadow-lg border border-transparent flex items-center py-1.5">
        <span className="pl-3">$</span>
        {inputs.length ? (
          <div className="flex items-center gap-1.5 pl-1.5">
            {inputs.map((inp, index) => {
              return (
                <span key={index} className="whitespace-nowrap text-sm">
                  {inp.text}
                </span>
              )
            })}{" "}
          </div>
        ) : null}
        <input
          ref={ref}
          type="text"
          onChange={(ev) => {
            setInpValue(ev.target.value)
          }}
          onKeyDown={onKeyPressed}
          className="w-full pl-[5px] bg-transparent border-transparent text-sm h-[20px] text-color-base focus:border-transparent focus:ring-transparent"
        />
        {suggestList.length ? (
          <div className="autosuggest-commands bg-dark text-color-base">
            {suggestList.map((keyword) => {
              return (
                <div className="command-item" key={keyword}>
                  {keyword}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
