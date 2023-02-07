import { useOutlineStore } from "../../store/outlines"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { BsMenuButtonWideFill } from "react-icons/bs"
import { Outlines } from "./Outlines";
import { useEffect } from "react";
import ScrollBar from "../../components/ScrollBar";

export const Outline = () => {
  const { contentOutline, setIsOpen, setOutlines, isOpen } = useOutlineStore();

  useEffect(() => {
    if (!isOpen) {
      setOutlines();
    }
  }, [isOpen, setOutlines])
  return (
    <>
      <div className="outline-container">
        <div className="flex items-center">
          <BsMenuButtonWideFill className="outline-icon" />
        </div>
        <h4 className="outline-title" >OUTLINE</h4>
        <div className="flex items-center" onClick={() => setIsOpen()}>
          <MdKeyboardArrowLeft className="outline-icon" />
        </div>
      </div>
      <ScrollBar height="calc(100vh - 71px)">
        <Outlines outlineTree={contentOutline} />
      </ScrollBar>
    </>
  )
}

