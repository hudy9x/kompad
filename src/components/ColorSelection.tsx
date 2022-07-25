import { useRef } from "react";
import { COLORS } from "../constants";

interface IColorSelectionProps {
  className?: string;
  selected?: string;
  onChange?: (color: string) => void;
}

function ColorSelection({
  selected,
  className,
  onChange,
}: IColorSelectionProps) {
  const colorContainerRef = useRef<HTMLDivElement>(null);

  const onSelectColor = (color: string) => {
    onChange && onChange(color);
  };

  return (
    <div ref={colorContainerRef} className={className}>
      <div className="grid grid-cols-6 gap-3 ">
        {COLORS.map((color) => {
          const isSelected = color === selected;
          return (
            <span
              onClick={() => onSelectColor(color)}
              key={color}
              style={{ backgroundColor: color }}
              className={`${
                isSelected ? "ring-indigo-500 dark:ring-offset-gray-700" : "ring-transparent dark:ring-offset-gray-700"
              } w-3 h-3 cursor-pointer rounded-full ring-2  ring-offset-1 hover:ring-indigo-500`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}

export default ColorSelection;
