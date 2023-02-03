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
  const { hiddenArr } = hiddenOutline


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
      case 1: 
        return 'pl-2'
      case 2:
        return 'pl-4'
      case 3:
        return 'pl-6'
      case 4:
        return 'pl-8'
      case 5:
        return 'pl-10'
      case 6:
        return 'pl-12'
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
      !hiddenArr.includes(index) && (<div className={`flex outline-content ${levelStyle(level)} pr-9 `} onClick={() => handleOutLineDropdown(id, level)}>
        {displayIcon()}
        <p className={`${isIcon ? 'pl-1' : 'pl-5'} w-full break-words cursor-pointer`} >{title}</p>
      </div>)
    )
  }

  return (
    <div>
      {renderOutline()}
    </div>
  )
}

