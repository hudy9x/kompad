import { useEffect, useRef, useState, createContext, useContext } from "react";

interface IContextMenu {
  children: JSX.Element | JSX.Element[],
  condition?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => boolean
  enabled?: boolean 
}

interface IMenuStore {
  top: number;
  left: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = createContext<IMenuStore>({
  top: 0,
  left: 0,
  visible: false,
  setVisible: (bool) => { console.log(bool) }
})

export default function ContextMenu({ children, condition, enabled }: IContextMenu) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const { top, left } = position;

  const onContextMenu = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!enabled) return
    const { clientX, clientY } = ev

    try {
      if (condition && !condition(ev)) {
        return;
      }

      ev.preventDefault();
      setPosition({
        top: clientY,
        left: clientX
      })

      setVisible(true);
    } catch (er) {
      setVisible(false);
    }
  };
  
  return <MenuContext.Provider value={{ top, left, visible, setVisible }}>
    <div className="ctx-menu" onContextMenu={onContextMenu}>
      {children}
    </div>
  </MenuContext.Provider>
}

ContextMenu.Items = function ContextMenuItems({ children }: { children: JSX.Element | JSX.Element[] }) {
  const ctxRef = useRef<HTMLDivElement>(null)
  const { top, left, visible, setVisible } = useContext(MenuContext)

  useEffect(() => {
    const clickOutsideHandler = (ev: MouseEvent) => {
      const target = ev.target;
      if (!ctxRef.current || !target) {
        return;
      }

      const menuElem = ctxRef.current;

      if (visible && !menuElem.contains(target as Node)) {
        setVisible(false);
      }
    }

    const pressEscHandler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && visible) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', clickOutsideHandler)
    document.addEventListener('keydown', pressEscHandler)
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler)
      document.removeEventListener('keydown', pressEscHandler)
    }
  })

  const displayContextMenu = (top: number, left: number) => {
    if (!ctxRef.current) return;

    const ctxElem = ctxRef.current;
    const dropDownElem = ctxElem.querySelector('.dropdown') as HTMLDivElement;
    const windowH = document.body.offsetHeight;

    if (!dropDownElem) {
      return;
    }

    const dropDownH = dropDownElem.offsetHeight;

    console.log(dropDownH, windowH, top)

    if (top + dropDownH > windowH) {
      top -= (top + dropDownH + 41 - windowH)
    } else {
      top -= 20
    }

    left += 10;

    ctxElem.style.top = `${top}px`;
    ctxElem.style.left = `${left}px`;
    ctxElem.style.opacity = '1';

  }

  useEffect(() => {
    visible && displayContextMenu(top, left);
  }, [top, left, visible])


  if (!visible) return null

  return <div
    ref={ctxRef}
    onClick={() => {
      setVisible(false);
    }}
    className={`ctx-dropdown fixed z-10`}
    style={{ opacity: 0 }}
  >
    {children}
  </div>
}

export const useContextMenu = () => {
  const data = useContext(MenuContext)
  return data;
}

