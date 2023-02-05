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


  const handleOutLineDropdown = (id: string, level: number) => {
    setToggleThisElement((prev) => !prev);
    setDropDownContent(id, level, toggleThisElement);
  }

  const displayIcon = () => {
    if (!isIcon) {
      return <div></div>
    }

    return (
      <div className="outline-item-dropdown-icon" 
        onClick={() => handleOutLineDropdown(id, level)} >
        {toggleThisElement ? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown /> }
      </div>
    )
  }

  const levelStyle = (level: number) => {
    switch (level) {
      case 1:
        return 'pl-4'
      case 2:
        return 'pl-6'
      case 3:
        return 'pl-8'
      case 4:
        return 'pl-10'
      case 5:
        return 'pl-12'
      case 6:
        return 'pl-14'
    }
  }

  const smoothScroll = () => {
    const el = document.getElementById(`${id}`);
    if (!el) {
      return;
    }
    el.scrollIntoView({
      "behavior": "smooth"
    });
  }


  const renderOutline = () => {
    const goToHeading = () => {
      smoothScroll()
    }

    return (
      !hiddenArr.includes(index) && (<div className={`flex outline-content ${levelStyle(level)} pr-4 `} 
      onClick={goToHeading} >
        <p className={`${isIcon ? '' : ''} w-full break-words cursor-pointer`} >{title}</p>
        {displayIcon()}
      </div>)
    )
  }

  return (
    <div className="cursor-pointer">
      {renderOutline()}
    </div>
  )
}

