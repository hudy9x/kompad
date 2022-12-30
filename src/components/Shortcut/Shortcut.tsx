import { useEffect, useRef } from "react";
import { shortCutAcion } from "./ShortcutAction";

export default function Shortcut() {
  const ref = useRef(null);

  useEffect(() => {
    let map: Record<string, boolean> = {}

    const handleDown = (ev: KeyboardEvent) => {
      const key = ev.key.toLowerCase();
      map[key] = ev.type === 'keydown';
      shortCutAcion(ev, map);
    };
    
    const handleUp = () => {
      map = {}
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
