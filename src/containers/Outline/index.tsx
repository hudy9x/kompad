import { ContentOutline, useOutlineStore } from "../../store/outlines"
import { MdKeyboardArrowLeft, MdKeyboardArrowDown } from "react-icons/md"
import { BsMenuButtonWideFill } from "react-icons/bs"

export const Outline = () => {
  const { contentOutline, setIsOpen, setDropDownContent } = useOutlineStore();

  const handleOutLineDropdown = (id: string, level: number) => {
    setDropDownContent(id, level);
  }

  const arrangeOutline = (value: ContentOutline) => {
    switch (value.level) {
      case 2:
        return (
          <div className="flex outline-content" onClick={() => handleOutLineDropdown(value.id, value.level)}>
            {value.isIcon && <div className="flex items-center">
              <MdKeyboardArrowDown />
            </div>}
            <a href={`#${value.id}`} >{value.title}</a>
          </div>
        )
      case 3:
        return (
          <div className="flex outline-content" onClick={() => handleOutLineDropdown(value.id, value.level)}>
            {value.isIcon && <div className="flex items-center">
              <MdKeyboardArrowDown />
            </div>}
            {value.isCheck && <a href={`#${value.id}`} >{value.title}</a>}
          </div>
        )
      case 4:
        return (
          value.isCheck && <a className='outline-content pl-14' href={`#${value.id}`} >{value.title}</a>
        )
    }
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="flex items-center">
          <BsMenuButtonWideFill className="outline-icon" />
        </div>
        <h4 className="outline-title" >OUTLINE</h4>
        <div className="flex items-center" onClick={() => setIsOpen()}>
          <MdKeyboardArrowLeft className="outline-icon" />
        </div>
      </div>
      <div className="mt-4" >
        {contentOutline.map((value, id) => {
          return <div key={id}>
            {arrangeOutline(value)}
          </div>
        })}
      </div>
    </>
  )
}
