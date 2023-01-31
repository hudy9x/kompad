import { useState } from "react";
import { ContentOutline, useOutlineStore } from "../../store/outlines";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

export const Outlines = ({ contentOutline, index }: {
  contentOutline: ContentOutline,
  index: number
}) => {
  const [toggleThisElement, setToggleThisElement] = useState(false);
  const { hiddenOutline, setDropDownContent } = useOutlineStore();

  const displayIcon = () => {
    if (!contentOutline.isIcon) {
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
      case value:
        
        break;
      case value:
        
        break;
      case value:
        
        break;
      
      
      default:
        break;
    }
  }

  const renderOutline = () => {
    const handleOutLineDropdown = (id: string, level: number) => {
      setToggleThisElement((prev) => !prev);
      setDropDownContent(id, level, toggleThisElement);
    }

    return (
      !hiddenOutline.hiddens.includes(index) && (<div className={`flex outline-content ${levelStyle(contentOutline.level)}`} onClick={() => handleOutLineDropdown(contentOutline.id, contentOutline.level)}>
        {displayIcon()}
        {<a className={contentOutline.isIcon ? 'pl-1' : 'pl-5'} href={`#${contentOutline.id}`} >{contentOutline.title}</a>}
      </div>)
    )
  }

  return (
    <div>
      {renderOutline()}
    </div>
  )
}
