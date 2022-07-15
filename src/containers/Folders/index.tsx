import { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsCheck2, BsFolder } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";

function Folders() {
  const inp = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  return (
    <section className="sec-container">
      <h2 className="sec-title group relative">
        <FcFolder />
        <span>Folders</span>
        <BiPlus className="hidden group-hover:block absolute top-3 right-2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-500" />
      </h2>
      <div className="sec-content">
        <div className="sec-item">
          <BsFolder />
          <span>Management</span>
        </div>
        <div className="sec-item">
          <BsFolder />
          <span>Management</span>
        </div>
        <div>
          <div
            style={{ display: visible ? "" : "none" }}
            className={`sec-item`}
          >
            <div className="relative">
              <input
                ref={inp}
                type="text"
                className="py-1 pr-8 shadow-sm w-full block sm:text-sm border-gray-300 rounded-md"
              />
              <span
                style={{ fontSize: "10px" }}
                className="absolute px-1 h-5 leading-4 top-1.5 right-1.5 bg-gray-50 border rounded cursor-pointer"
                title="Choose folder color"
              >
                OK
              </span>
              <div className="flex gap-2 items-center mt-1">
                <small>Choose color</small>
                <BsFolder className="bg-gray-100 cursor-pointer" />
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
            <span>Create new</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Folders;
