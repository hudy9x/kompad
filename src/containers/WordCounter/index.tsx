import { Menu, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { Fragment, useEffect, useState, } from "react";
import { OutsideClickHandler } from "../../components/OutsideClickHandler";
import { Provider } from "./context";
import { WordCounterModal } from "./WordCounterModal";

export interface WordCounter {
  count: string | number,
  text: string
}

const initialState: WordCounter[] = [
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

const WORDS_PER_MINUTE = 200;

export const WordCounter = ({ editor }: {
  editor: Editor
}) => {
  const [wordCounter, setWordCounter] = useState<WordCounter[]>(initialState);
  const [selectedWordCount, setSelectedWordCount] = useState<WordCounter>(wordCounter[2]);
  const [isOpenWordCount, setIsOpenWordCount] = useState<boolean>(false);

  const countFunctions: {
    [key: string]: (editor: Editor) => number
  } = {
    "Words": (editor: Editor) => editor.storage.characterCount.words(),
    "Characters": (editor: Editor) => editor.storage.characterCount.characters(),
    "Lines": (editor: Editor) => editor.getText().split("\n").length,
    "Minutes": (editor: Editor) => {
      const minutes = editor.getText().split("\n").length / WORDS_PER_MINUTE;
      return editor.getText() === "" ? 0 : minutes <= 1 ? 1 : Math.round(minutes);
    }
  }

  // const getAllWordCount = (editor: Editor) => {
  //   return wordCounts.map((item) => {
  //     if (countFunctions[item.text]) {
  //       item.count = countFunctions[item.text](editor).toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  //     }
  //     return item;
  //   })
  // }

  // const handleClickWordCount = (item: WordCounts) => {
  //   setSelectedWordCount(item);
  //   setIsOpenWordCount(false);
  // }

  const handleOpenModalHandler = () => {
    if (!editor) {
      return;
    }
    const newWordCount = getAllWordCount(editor);
    setWordCounter(newWordCount);
    setIsOpenWordCount(!isOpenWordCount);
  }

  const displayWordCount = () => {
    if (selectedWordCount.text === "Words") {
      const words = countFunctions["Words"](editor).toLocaleString("vi-VN", { maximumFractionDigits: 0 });
      return `${words} Words`;
    } else if (selectedWordCount.text === "Characters") {
      const characters = countFunctions["Characters"](editor).toLocaleString("vi-VN", { maximumFractionDigits: 0 });
      return `${characters} Characters`;
    } else if (selectedWordCount.text === "Lines") {
      const lines = countFunctions["Lines"](editor).toLocaleString("vi-VN", { maximumFractionDigits: 0 });
      return `${lines} Lines`;
    } else if (selectedWordCount.text === "Minutes") {
      let newMinutes = countFunctions["Minutes"](editor);
      return `${Math.round(newMinutes)} Minutes`;
    }
  }

  useEffect(() => {
    if (!isOpenWordCount) {
      return;
    }
    const newWordCount = getAllWordCount(editor);
    setWordCounter(newWordCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenWordCount])

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpenWordCount(false)}>
      <Menu as="div" className="relative inline-block text-left float-right">
        <div>
          <Menu.Button className="rounded-full flex items-center" onClick={() => handleOpenModalHandler()}>
            {isOpenWordCount ? <span>{selectedWordCount.count}{" "}{selectedWordCount.text}</span> : displayWordCount()}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Provider
            props={{
              editor,
              wordCounter,
              isOpenWordCount,
              selectedWordCount,
              setIsOpenWordCount,
              setSelectedWordCount,
            }}
          >
            <WordCounterModal />
          </Provider>
        </Transition>
      </Menu>
    </OutsideClickHandler>
  )
}
