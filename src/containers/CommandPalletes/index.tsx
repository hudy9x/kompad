import React, { useEffect, useRef, useState } from "react"
import {
  COMMAND_PALLETES_STATUS,
  getCache,
  LOCKING_SCREEN_STATUS,
} from "../../libs/localCache"
import { ECommandType, ICommand, ICommandSuggestItem } from "../../types"
import { useCommand } from "./useCommand"

export default function CommandPalletes() {
  const [visible, setvisible] = useState(false)
  const [inputs, setInputs] = useState<ICommand[]>([])
  const ref = useRef<HTMLInputElement>(null)
  const { executeCommand, suggestKeyword } = useCommand()
  const [inpValue, setInpValue] = useState("")
  const [suggestList, setSuggestList] = useState<ICommandSuggestItem[]>([])
  const [selectedSuggestItem, setSelectedSuggestItem] = useState(-1)

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

  // execute the command when hitting enter
  useEffect(() => {
    const onTrigger = (ev: KeyboardEvent) => {
      const key = ev.key
      const isModalOpened = document.querySelector("#headlessui-portal-root")
      const isTurnon = getCache(COMMAND_PALLETES_STATUS) === "1" ? true : false
      const isAppStillLocking = getCache(LOCKING_SCREEN_STATUS) || ""

      if (!isTurnon) return

      // DO NOT open command pallete in case there's a modal is closing
      if (isModalOpened || isAppStillLocking) {
        return
      }

      if (key.toLowerCase() !== "escape") {
        return
      }

      !visible === false && setInputs([])
      !visible === false && setInpValue("")
      !visible === false && setSelectedSuggestItem(-1)
      setvisible(!visible)
    }
    document.addEventListener("keydown", onTrigger)
    return () => {
      document.removeEventListener("keydown", onTrigger)
    }
  }, [visible])

  // autofocus on input when command palletes opened
  useEffect(() => {
    if (visible && ref.current) {
      const input = ref.current

      input.value = ""
      setTimeout(() => {
        input.focus()
      }, 250)
    }
  }, [visible])

  // suggest keyword when typing command, options or values
  useEffect(() => {
    const suggestedKeywords = suggestKeyword(inputs, inpValue)
    setSuggestList(suggestedKeywords || [])
    // eslint-disable-next-line
  }, [inpValue, inputs])

  const completeCommandByTab = (target: HTMLInputElement) => {
    const suggestListLen = suggestList.length
    let nextSuggestItem = selectedSuggestItem + 1
    nextSuggestItem = nextSuggestItem >= suggestListLen ? 0 : nextSuggestItem

    setSelectedSuggestItem(nextSuggestItem)

    const nextItem = suggestList[nextSuggestItem]
    target.value = nextItem.title
    target.focus()
  }

  const onKeyPressed = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key.toLowerCase()
    const target = ev.target as HTMLInputElement
    const value = target.value
    const isSpace = key.match(/\s+$/)

    // only execute command when the command pallete opens
    if (!visible) {
      return
    }

    // delete prev input when hitting backspace
    if (key === "backspace" && !value) {
      setInputs((inps) => inps.slice(0, -1))
      return
    }

    // select suggested keyword by pressing tab
    if (key === "tab") {
      ev.stopPropagation()
      ev.preventDefault()
      completeCommandByTab(target)

      return
    }

    // parsing input's text and insert extracted value to input state
    if (isSpace) {
      let type = ECommandType.CONTENT
      const isCommand = !inputs.length ? "command" : ""
      const isOption = value.match(/^-+/) ? "option" : ""

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

    // if input value contains option format, split value into 2 parts
    // one for content, the other for option
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
    console.log("execute command /////////////////////")
    executeCommand(commands)
    setInputs([])
    setvisible(false)
  }

  const hasNoInputs = !inputs.length
  const hasSuggest = suggestList.length

  return (
    <div
      className={`command-pallete ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`command-search-container bg-dark text-color-base ${
          hasSuggest ? "has-suggest-item" : ""
        }`}
      >
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
          placeholder={hasNoInputs ? "Ex: doc, dup, del, filter, ..." : ""}
          onKeyDown={onKeyPressed}
          className="w-full pl-[5px] bg-transparent border-transparent text-sm h-[20px] text-color-base focus:border-transparent focus:ring-transparent"
        />
        <div
          className={`autosuggest-commands bg-dark text-color-base ${
            suggestList.length ? "" : "opacity-0"
          }`}
        >
          {suggestList.map((keyword, index) => {
            const active = index === selectedSuggestItem
            return (
              <div
                className={`command-item ${active ? "active" : ""}`}
                key={index}
              >
                <span>{keyword.title}</span>
                <span className="opacity-40">{keyword.desc}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
