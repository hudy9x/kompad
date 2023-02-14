import { useOutlineStore } from "../../store/outlines";

export const OutlineButton = () => {
  const { setIsOpen, isOpen } = useOutlineStore();

  return (
    <button className={`${isOpen ? 'close-outline' : ''} hover:text-inherit`} onClick={() => setIsOpen()}>Outline</button>
  )
}
