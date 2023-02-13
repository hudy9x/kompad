import { OutlineItemTree, useOutlineStore } from "../../store/outlines";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

export const Outlines = ({ outlineTree }: {
  outlineTree: OutlineItemTree[]
}) => {
  const { toggle, setToggle } = useOutlineStore();

  const levelStyle = (level: number) => {
    switch (level) {
      case 1:
        return 'pl-4'
      case 2:
        return 'pl-6'
      case 3:
        return 'pl-8'
      case 4:
        return 'pl-10'
      case 5:
        return 'pl-12'
      case 6:
        return 'pl-14'
    }
  }

  const displayIcon = (index: string) => {
    return (
      <div className="outline-item-dropdown-icon"
        onClick={() => setToggle(index)} >
        {!toggle[index] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </div>
    )
  }

  const handleOutlineSmoothView = (id: string) => {
    const el = document.getElementById(`${id}`);
    if (!el) {
      return;
    }
    el.scrollIntoView({
      "behavior": "smooth"
    });;
  }

  return (
    <ul>
      {outlineTree.map((outline, index) => (
        <li key={index} >
          <div className={`${levelStyle(outline.level)} flex outline-content pr-4`} >
            <p className=" w-full break-words cursor-pointer" onClick={() => handleOutlineSmoothView(outline.id)}>{outline.title}</p>
            {outline.children.length > 0 && displayIcon(outline.id)}
          </div>
          {!toggle[outline.id] && outline.children.length > 0 && (
            <Outlines outlineTree={outline.children} />
          )}
        </li>
      ))}
    </ul>
  )
}
