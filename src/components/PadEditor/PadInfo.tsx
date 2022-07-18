import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { BsFolder } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { IPad, updatePad, updatePadMetadata } from "../../services/pads";
import PadFolder from "./PadFolder";
import PadTag from "./PadTag";

let timeout: number;

interface IPadInfoProps {
  info: IPad;
}

function PadInfo({ info }: IPadInfoProps) {
  const inpRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();

  const updateTitle = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      // updatePad
      if (!inpRef.current || !id) {
        return;
      }

      updatePadMetadata({ id, title: inpRef.current.value });
    }, 500) as unknown as number;
  };

  useEffect(() => {
    if (inpRef.current) {
      inpRef.current.value = info.title;
    }
  }, [info.title]);

  const created = dayjs(info.createdAt.toDate()).format("YYYY/MM/DD");

  return (
    <div className="pad-infos pb-3">
      <input
        ref={inpRef}
        // value={info.title}
        onChange={updateTitle}
        className="mx-8 mb-5 h-12 md:w-[700px] xl:w-[800px] m-auto text-4xl text-gray-700 font-extrabold outline-none"
        placeholder="Untitled"
      />
      <div className="pad-details mx-8 space-y-2 text-gray-600">
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Created at:</span>
          <span>{created}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Tags:</span>
          <PadTag selected={info.tags} />
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Folder:</span>
          <PadFolder selected={info.folder || ""} />
        </div>
      </div>
    </div>
  );
}

export default PadInfo;
