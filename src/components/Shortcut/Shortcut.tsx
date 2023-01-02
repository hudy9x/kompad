import { useEffect, useRef } from "react";
import { KeyBoardProps, shortCutAcion } from "./ShortcutAction";

export default function Shortcut() {
  const ref = useRef(null);

  useEffect(() => {
    let pressed: KeyBoardProps = {shift: false, control: false, b: false, p: false, alt: false, escape: false, t: false}
  
    const handleDown = (ev: KeyboardEvent) => {
      shortCutAcion(ev, pressed);
    };
    
    const handleUp = () => {
      pressed = {shift: false, control: false, b: false, p: false, alt: false, escape: false, t: false}
    }

    document.addEventListener("keydown", handleDown);
    document.addEventListener("keyup", handleUp);
    return () => {
      document.removeEventListener("keydown", handleDown);
      document.removeEventListener("keyup", handleUp);
    };
  }, []);

  return <div ref={ref} tabIndex={-1}></div>;
}
