import { useLayoutEffect, useState } from "react";

export const useWindowSize = () => {
    const [size, setSize] = useState<any[]>([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}