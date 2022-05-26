import { useEffect, useRef } from "react";
import { shortCutAcion } from "./ShortcutAction";

export default function Shortcut() {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      shortCutAcion(ev);
    };

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  return <div ref={ref} tabIndex={-1}></div>;
}
