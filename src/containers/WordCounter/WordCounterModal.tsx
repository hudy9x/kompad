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
  const { editor, visible, setVisible, setCounter } = useContext(Context) as ProviderProps;
  const [wordCounter, setWordCounter] = useState<IWordCounter[]>(initialState);

  const handleClickWordCount = (item: IWordCounter) => {
    setCounter(item);
    setVisible(false);
  }

  const getAllWordCounter = () => {
  return wordCounter.map((item) => {
    switch (item.text) {
      case WordCounterText.Words:
        item.count = calWords(editor);
        break;
      case WordCounterText.Lines:
        item.count = calLines(editor);
        break;
      case WordCounterText.Characters:
        item.count = calChar(editor);
        break;
      case WordCounterText.Minutes:
        item.count = calMins(editor);
        break;
      default:
        break;
    }
    return item;
  });
};

  useEffect(() => {
    if (!editor || !visible) {
      return;
    }
    const newDataWordCounter = getAllWordCounter();
    setWordCounter(newDataWordCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Menu.Items className="dropdown -right-0 absolute bottom-8 mt-2 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">

      <div className="py-1 w-[250px]">
        <div className="p-2 word-count-title">
          <p className="uppercase text-[11px] font-medium text-gray-400" >Counting words</p>
        </div>
        {wordCounter.map((item, index) => (
          <Menu.Item key={index}>
            <div className="flex justify-evenly p-2 word-count-item pl-7 pr-3" onClick={() => handleClickWordCount(item)}>
              <p className="word-count-text w-full">{item.text}</p>
              <p className={`${item.text.toLocaleLowerCase()} word-count-text rounded-md text-xs px-2`} >{item.count}</p>
            </div>
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  )
}
