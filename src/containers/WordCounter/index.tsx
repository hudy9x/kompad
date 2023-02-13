import { Menu, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { Fragment, useEffect, useState, } from "react";
import { OutsideClickHandler } from "../../components/OutsideClickHandler";
import { Provider } from "./context";
import { IWordCounter, WordCounterText } from "./types";
import { calChar, calLines, calMins, calWords } from "./utils";
import { WordCounterModal } from "./WordCounterModal";

const initialState = {
  count: "0",
  text: "Words",
}

export const WordCounter = ({ editor }: {
  editor: Editor
}) => {
  const [selectedWordCount, setSelectedWordCount] = useState<IWordCounter>(initialState);
  const [isOpenWordCount, setIsOpenWordCount] = useState<boolean>(false);

  const handleIsOpenModal = () => {
    setIsOpenWordCount(!isOpenWordCount);
  }

  const displayWordCount = () => {
    if (selectedWordCount.text === WordCounterText.Words) {
      return calWords(editor)
    } else if (selectedWordCount.text === WordCounterText.Lines) {
      return calLines(editor)
    } else if (selectedWordCount.text === WordCounterText.Characters) {
      return calChar(editor)
    } else if (selectedWordCount.text === WordCounterText.Minutes) {
      return calMins(editor)
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpenWordCount(false)}>
      <Menu as="div" className="relative inline-block text-left float-right">
        <div>
          <Menu.Button className="rounded-full flex items-center" onClick={() => handleIsOpenModal()}>
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
