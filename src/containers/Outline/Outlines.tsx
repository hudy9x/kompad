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

  const renderOutline = () => {
    const handleOutLineDropdown = (id: string, level: number) => {
      setToggleThisElement((prev) => !prev);
      setDropDownContent(id, level, toggleThisElement);
    }

    switch (contentOutline.level) {
      case 2:
        return (
          <div className="flex outline-content" onClick={() => handleOutLineDropdown(contentOutline.id, contentOutline.level)}>
            {displayIcon()}
            <a className={contentOutline.isIcon ? 'pl-1' : 'pl-5'} href={`#${contentOutline.id}`} >{contentOutline.title}</a>
          </div>
        )
      case 3:
        return (
          !hiddenOutline.hiddens.includes(index) && (<div className="flex outline-content pl-3" onClick={() => handleOutLineDropdown(contentOutline.id, contentOutline.level)}>
            {displayIcon()}
            {<a className={contentOutline.isIcon ? 'pl-1' : 'pl-5'} href={`#${contentOutline.id}`} >{contentOutline.title}</a>}
          </div>)

        )
      case 4:
        return (
          !hiddenOutline.hiddens.includes(index) && <a className='outline-content pl-14' href={`#${contentOutline.id}`} >{contentOutline.title}</a>
        )
    }
  }

  return (
    <div>
      {renderOutline()}
    </div>
  )
}
