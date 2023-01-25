import { useOutlineStore } from "../../store/outlines"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { BsMenuButtonWideFill } from "react-icons/bs"
import { Outlines } from "./Outlines";

export const Outline = () => {
  const { contentOutline, setIsOpen } = useOutlineStore();

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
        {contentOutline.map((value, idx) => {
          return <Outlines contentOutline={value} index={idx}/>
        })}
      </div>
    </>
  )
}
