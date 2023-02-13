import { Menu } from "@headlessui/react"
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Context } from "./context";
import { ProviderProps, IWordCounter, WordCounterText } from "./types";
import { calChar, calWords, calLines, calMins } from "./utils";

const initialState: IWordCounter[] = [
  {
    count: "0",
    text: "Minutes",
  },
  {
    count: "0",
    text: "Lines",
  },
  {
    count: "0",
    text: "Words",
  },
  {
    count: "0",
    text: "Characters",
  },
]

export const WordCounterModal = () => {
  const { editor, isOpenWordCount, setIsOpenWordCount, setSelectedWordCount } = useContext(Context) as ProviderProps;
  const [wordCounter, setWordCounter] = useState<IWordCounter[]>(initialState);

  const handleClickWordCount = (item: any) => {
    setSelectedWordCount(item);
    setIsOpenWordCount(false);
  }

  const getAllWordCounter = () => {
    return wordCounter.map((item) => {
      if (item.text === WordCounterText.Words) {
        item.count = calWords(editor)
      } else if (item.text === WordCounterText.Lines) {
        item.count = calLines(editor)
      } else if (item.text === WordCounterText.Characters) {
        item.count = calChar(editor)
      } else if (item.text === WordCounterText.Minutes) {
        item.count = calMins(editor)
      }
      return item;
    })
  }

  useEffect(() => {
    if (!editor || !isOpenWordCount) {
      return;
    }
    const newDataWordCounter = getAllWordCounter();
    setWordCounter(newDataWordCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenWordCount])

  return (
    <Menu.Items className="dropdown -right-0 absolute bottom-8 mt-2 w-40 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">

      <div className="py-1">
        <div className="p-2 word-count-title">
          <p className="text-center text-gray-500" >Word Count</p>
        </div>
        {wordCounter.map((item, index) => (
          <Menu.Item key={index}>
            <div className="flex justify-evenly p-2 word-count-item pl-7 pr-3" onClick={() => handleClickWordCount(item)}>
              <p className="word-count-text w-32" >{item.count}</p>
              <p className="word-count-text w-full">{item.text}</p>
            </div>
          </Menu.Item>
        ))}
      </div>

    </Menu.Items>
  )
}