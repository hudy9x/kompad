import { useState } from "react";
import { ContentOutline, useOutlineStore } from "../../store/outlines";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

export const Outlines = ({ contentOutline, index }: {
  contentOutline: ContentOutline,
  index: number
}) => {
  const [toggleThisElement, setToggleThisElement] = useState(false);
  const { hiddenOutline, setDropDownContent } = useOutlineStore();
  const { level, title, id, isIcon } = contentOutline
  const { hiddens } = hiddenOutline


  const displayIcon = () => {
    if (!isIcon) {
      return <div></div>
    }

    if (toggleThisElement) {
      return (
        <div className="flex items-center">
          <MdKeyboardArrowUp />
        </div>
      )
    } else {
      return (
        <div className="flex items-center">
          <MdKeyboardArrowDown />
        </div>
      )
    }
  }

  const levelStyle = (level: number) => {
    switch (level) {
      case 2:
        return 'pl-1'
      case 3:
        return 'pl-3'
      case 4:
        return 'pl-8'
    }
  }

  const smoothScroll = () => {
    const el = document.getElementById(`${id}`);
    if(!el) {
      return;
    }
    el.scrollIntoView({
      "behavior": "smooth"
    });
  }  

  const renderOutline = () => {
    const handleOutLineDropdown = (id: string, level: number) => {
      smoothScroll()
      setToggleThisElement((prev) => !prev);
      setDropDownContent(id, level, toggleThisElement);
    }

    return (
      !hiddens.includes(index) && (<div className={`flex outline-content ${levelStyle(level)}`} onClick={() => handleOutLineDropdown(id, level)}>
        {displayIcon()}
        {<a className={`${isIcon ? 'pl-1' : 'pl-5'} w-full break-words pr-5 cursor-pointer`} >{title}</a>}
      </div>)
    )
  }

  return (
    <div>
      {renderOutline()}
    </div>
  )
}

