import { useOutlineStore } from "../../store/outlines";

export const OutlineButton = () => {
  const { setIsOpen, isOpen } = useOutlineStore();

  return (
    <button className={`${isOpen ? 'close-outline' : ''} hover:text-inherit absolute left-10`} onClick={() => setIsOpen()}>Outline</button>
  )
}
