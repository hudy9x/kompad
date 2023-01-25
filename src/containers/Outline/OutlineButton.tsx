import { getAllOutline, useOutlineStore } from "../../store/outlines";

export const OutlineButton = () => {
 const { setIsOpen, setOutlines } = useOutlineStore();
 const handleOutline = () => {
  const outlines = getAllOutline();

  if (!outlines) {
   return;
  }

  setIsOpen();
  setOutlines(outlines);
 }
 return (
  <button className="absolute left-10" onClick={handleOutline}>Outline</button>
 )
}
