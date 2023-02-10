import { Menu } from "@headlessui/react"
import { Editor } from "@tiptap/react";
import { useContext } from "react";
import { Context, ProviderProps } from "./context";

const WORDS_PER_MINUTE = 200;

export const WordCounterModal = () => {
  const { wordCounter, editor, isOpenWordCount, setIsOpenWordCount  } = useContext(Context) as ProviderProps;

  const handleClickWordCount = (item: any) => {

  }

  const calWords = () => {
    return editor.storage.characterCount.words().toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  }

  const calChar = () => {
    return editor.storage.characterCount.characters().toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  }

  const carLines = () => {
    return editor.getText().split("\n").length.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  }

  const carMins = () => {
    const minutes = editor.getText().split("\n").length / WORDS_PER_MINUTE;
    const mins =  editor.getText() === "" ? 0 : minutes <= 1 ? 1 : Math.round(minutes);
    return editor.getText().split("\n").length.toLocaleString("vi-VN", { maximumFractionDigits: 0 }); 
  }

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