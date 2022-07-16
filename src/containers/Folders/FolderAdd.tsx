import { useCallback, useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";
import { message } from "../../components/message";
import { addFolder } from "../../services/folders";

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

function FolderAdd() {
  const [color, setColor] = useState(COLORS[0]);
  const inp = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  const colorContainerRef = useRef<HTMLDivElement>(null);

  const [colorSelection, setColorSelection] = useState(false);

  const onSelectColor = (color: string) => {
    setColor(color);
    setColorSelection(false);
  };

  const onSubmit = useCallback(() => {
    if (!inp.current) {
      return;
    }

    addFolder({
      title: inp.current.value,
      color,
    })
      .then(() => {
        setVisible(false);
        inp.current && (inp.current.value = "");
        setColor(COLORS[0]);
      })
      .catch((err) => {
        console.log(err);
        message.error("Create folder Error");
      });
  }, [color]);

  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      const target = ev.target;

      if (!colorContainerRef.current || !target) return;

      if (!colorContainerRef.current.contains(target as Node)) {
        setColorSelection(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    const inpElem = inp.current;
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Enter") {
        onSubmit();
      }
    };

    inpElem && inpElem.addEventListener("keyup", handler);

    return () => {
      inpElem && inpElem.removeEventListener("keyup", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div style={{ display: visible ? "" : "none" }} className={`sec-item`}>
        <div className="relative">
          <input
            ref={inp}
            type="text"
            className="py-1 pr-8 shadow-sm w-full block sm:text-sm border-gray-300 rounded-md"
          />
          <span
            onClick={onSubmit}
            style={{ fontSize: "10px" }}
            className="absolute px-1 h-5 leading-4 top-1.5 right-1.5 bg-gray-50 border rounded cursor-pointer"
            title="Choose folder color"
          >
            OK
          </span>
          <div className="relative">
            <div
              onClick={() => {
                setColorSelection(true);
              }}
              className="flex gap-2 items-center mt-1 group cursor-pointer hover:text-gray-700"
            >
              <small>Choose color</small>
              <BsFolder
                style={{ color: color }}
                className="text-gray-500 group-hover:text-gray-700"
              />
            </div>
            <div
              ref={colorContainerRef}
              className={`${
                colorSelection ? "" : "hidden"
              } absolute z-10 top-6 border left-0 p-4 bg-white shadow-md rounded-md`}
            >
              <div className="grid grid-cols-6 gap-3">
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
        </div>
      </div>

      <div
        onClick={() => {
          setVisible(true);
          setTimeout(() => {
            if (!inp.current) return;
            inp.current.focus();
          }, 100);
        }}
        style={{ display: visible ? "none" : "" }}
        className={`sec-item hover:text-gray-700 cursor-pointer`}
      >
        <BiPlus />
        <span className="uppercase" style={{ fontSize: "0.65rem" }}>
          Create new
        </span>
      </div>
    </div>
  );
}

export default FolderAdd;
