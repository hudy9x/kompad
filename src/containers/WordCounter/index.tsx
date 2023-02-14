import { Menu, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { useState, } from "react";
import { OutsideClickHandler } from "../../components/OutsideClickHandler";
import { Provider } from "./context";
import { IWordCounter, WordCounterText } from "./types";
import { calChar, calLines, calMins, calWords } from "./utils";
import { WordCounterModal } from "./WordCounterModal";

const initialState = {
  count: "",
  text: "Words",
}

export const WordCounter = ({ editor }: {
  editor: Editor
}) => {
  const [counter, setCounter] = useState<IWordCounter>(initialState);
  const [visible, setVisible] = useState<boolean>(false);

  const handleIsOpenModal = () => {
    setVisible(!visible);
  }

  const displayWordCount = () => {
    if (counter.text === WordCounterText.Words) {
      return `${calWords(editor)} Words`
    } else if (counter.text === WordCounterText.Lines) {
      return `${calLines(editor)} Lines`
    } else if (counter.text === WordCounterText.Characters) {
      return `${calChar(editor)} Characters`
    } else if (counter.text === WordCounterText.Minutes) {
      return `${calMins(editor)} Minutes`
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <Menu as="div" className="relative inline-block text-left float-right">
        <div>
          <Menu.Button className="rounded-full flex items-center" onClick={() => handleIsOpenModal()}>
            {visible && counter.count ? <span>{counter.count}{" "}{counter.text}</span> : displayWordCount()}
          </Menu.Button>
        </div>

        <Transition
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
              visible,
              counter,
              setVisible,
              setCounter,
            }}
          >
            <div>
              <WordCounterModal />
            </div>
          </Provider>
        </Transition>
      </Menu>
    </OutsideClickHandler>
  )
}
