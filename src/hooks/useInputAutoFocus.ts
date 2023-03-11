import { useEffect, useRef } from "react"

type AutoFocusInputType = HTMLInputElement

export default function useInputAutoFocus() {
  const inputRef = useRef<AutoFocusInputType>(null)
  useEffect(() => {
    if (inputRef.current) {
      const inp = inputRef.current;
      setTimeout(() => {
        inp.focus && inp.focus()
      }, 250);
    }
  }, [inputRef])
  return inputRef;
}
