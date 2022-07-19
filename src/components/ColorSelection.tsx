import { useCallback, useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";

const COLORS = [
  "#6b7280",
  "#d72631",
  "#1fc865",
  "#345ee9",
  "#db29e8",
  "#ffcb20",
  "#d9138a",
  "#dd7734",
  "#322e2f",
  "#d9a5b3",
  "#1868ae",
  "#6d90b7",
  "#ffcce7",
  "#47b18d",
  "#81b7d2",
  "#4d5198",
];

interface IColorSelectionProps {
  onChange: (color: string) => void;
  children: (
    open: React.Dispatch<React.SetStateAction<boolean>>
  ) => JSX.Element | JSX.Element[];
}

function ColorSelection({ onChange, children }: IColorSelectionProps) {
  const colorContainerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const onSelectColor = (color: string) => {
    setVisible(false);
    onChange(color);
  };

  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      const target = ev.target;
      const container = colorContainerRef.current;

      if (!container || !target) return;
      if (!container.contains(target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div>
      {children(setVisible)}
      <div
        ref={colorContainerRef}
        className={`${
          visible ? "" : "hidden"
        } absolute z-10 top-6 border left-0 p-4 bg-white shadow-md rounded-md`}
      >
        <div className="grid grid-cols-6 gap-3 w-36">
          {COLORS.map((color) => {
            return (
              <span
                onClick={() => onSelectColor(color)}
                key={color}
                style={{ backgroundColor: color }}
                className="w-3 h-3 cursor-pointer rounded-full ring-2 ring-transparent ring-offset-1 hover:ring-indigo-500"
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ColorSelection;
