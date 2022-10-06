import dayjs from "dayjs";
import { Unsubscribe } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IPad, updatePadMetadata, watchPadById } from "../../services/pads";
import PadFolder from "./PadFolder";
import PadTag from "./PadTag";

let timeout: number;

interface IPadInfoContentProps {
  info: IPad;
}

function PadInfoContent({ info }: IPadInfoContentProps) {
  const title = useRef<string>();
  const { id } = useParams();

  const updateTitle = (e:any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      // updatePad
      if (!title.current || !id) {
        return;
      }
      
      updatePadMetadata({ id, title: e.target.innerText });
    }, 500) as unknown as number;
  };

  useEffect(() => {
    title.current = info.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.id]);
  const created = dayjs(info.createdAt.toDate()).format("YYYY/MM/DD");

  return (
    <div className="pad-infos">
      <p
        key="editor1"  
        onInput={updateTitle}
        contentEditable={true}
        className="inline-block mb-5 h-12 md:w-[700px] xl:w-[800px] m-auto text-4xl text-gray-700 font-extrabold outline-none dark:bg-transparent dark:text-gray-100"
        placeholder="Untitled"
        suppressContentEditableWarning={true}
      >
        {title.current}
      </p>
      <div className="pad-details space-y-2 text-gray-600 mt-2">
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Created at:</span>
          <span>{created}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Tags:</span>
          <PadTag allowUpdateIfEmpty={true} selected={info.tags} />
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Folder:</span>
          <div className="flex gap-2">
            <PadFolder allowUpdateIfEmpty={true} selected={info.folder || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PadInfo() {
  const { id } = useParams();
  const [info, setInfo] = useState<IPad>();

  useEffect(() => {
    let unsub: Unsubscribe;
    if (id) {
      unsub = watchPadById(id, (err, data) => {
        if (err) return;

        setInfo(data);
      });
    }

    return () => {
      unsub && unsub();
    };
  }, [id]);

  return info ? <PadInfoContent info={info} /> : null;
}

export default PadInfo;
