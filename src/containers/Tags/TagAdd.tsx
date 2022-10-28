import { useCallback, useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { message } from "../../components/message";
import { COLORS } from "../../constants";
import { addTag } from "../../services/tags";

function TagAdd() {
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
    const title = inp.current.value;

    if (!title) {
      setVisible(false);
      setColor(COLORS[0]);
      return;
    }

    addTag({
      title,
      color,
    })
      .then(() => {
        inp.current && (inp.current.value = "");
        setVisible(false);
        setColor(COLORS[0]);
      })
      .catch((err) => {
        console.log(err);
        setVisible(false);
        setColor(COLORS[0]);
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
            className="inp"
          />
          <span
            onClick={onSubmit}
            style={{ fontSize: "10px" }}
            className="absolute top-[5px] right-1.5 kbd-btn"
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
              <span
                style={{ backgroundColor: color }}
                className="w-2 h-2 rounded-full"
              ></span>
            </div>
            <div
              ref={colorContainerRef}
              className={`${colorSelection ? "" : "hidden"
                } absolute z-10 top-6 border left-0 p-4 bg border-color-base shadow-md rounded-md`}
            >
              <div className="grid grid-cols-6 gap-3">
                {COLORS.map((color) => {
                  return (
                    <span
                      onClick={() => onSelectColor(color)}
                      key={color}
                      style={{ backgroundColor: color }}
                      className="w-3 h-3 cursor-pointer rounded-full ring-2 ring-transparent dark:ring-offset-gray-800 ring-offset-1 hover:ring-indigo-500"
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
        className={`sec-item hover:text-gray-700 dark:hover:text-gray-400 cursor-pointer`}
      >
        <BiPlus />
        <span className="uppercase" style={{ fontSize: "0.65rem" }}>
          Create new
        </span>
      </div>
    </div>
  );
}

export default TagAdd;
