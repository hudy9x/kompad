import { useOutlineStore } from "../../store/outlines";

export const OutlineButton = () => {
 const { setIsOpen } = useOutlineStore();

 return (
  <button className="absolute left-10" onClick={() => setIsOpen()}>Outline</button>
 )
}
