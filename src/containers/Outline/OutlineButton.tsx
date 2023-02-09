import { useOutlineStore } from "../../store/outlines";

export const OutlineButton = () => {
  const { setIsOpen, isOpen } = useOutlineStore();

  return (
    <button className={`${isOpen ? 'close-outline' : ''} outline-btn absolute left-10`} onClick={() => setIsOpen()}>Outline</button>
  )
}
