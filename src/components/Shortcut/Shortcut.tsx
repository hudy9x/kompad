import { useEffect, useRef } from "react";
import { KeyBoardProps, shortCutAction } from "./ShortcutAction";

export let pressed: KeyBoardProps = { shift: false, control: false, enter: false, b: false, p: false, alt: false, escape: false, t: false, i: false, v: false, d: false, c: false, r: false, n: false, o: false, l: false }

export default function Shortcut() {
  const ref = useRef(null);

  useEffect(() => {

    const handleDown = (ev: KeyboardEvent) => {
      
      shortCutAction(ev, pressed);
    };

    const handleUp = () => {
      pressed = { shift: false, control: false, enter: false, b: false, p: false, alt: false, escape: false, t: false, i: false, v: false, d: false, c: false, r: false, n: false, o: false, l: false }
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
