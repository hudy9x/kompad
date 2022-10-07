import { useEffect, useRef, useState, Children, createContext, useContext } from "react";

interface IContextMenu {
  children: JSX.Element | JSX.Element[]
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

export default function ContextMenu({ children }: IContextMenu) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const { top, left } = position;

  const onContextMenu = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = ev
    ev.preventDefault();

    setPosition({
      top: clientY,
      left: clientX
    })

    setVisible(true);
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
    if (visible && ctxRef.current) {
      ctxRef.current.focus();
    }
  }, [visible])

  useEffect(()=> {
    const clickOutsideHandler = (ev: MouseEvent) => {
      if (!ctxRef.current) {
        return;
      }

      console.log(ev)
    }

    document.addEventListener('click', clickOutsideHandler)

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    }
  })

  return <div tabIndex={-1}
    ref={ctxRef}
    className={`ctx-dropdown fixed z-10 ${visible ? '' : 'hidden'}`}
    style={{ top, left }}>
    {children}
  </div>
}

