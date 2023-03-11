import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PadEditor from "../../components/PadEditor";
import { decryptText } from "../../services/encryption";
import { getPadById, IPad, saveCurrentPad } from "../../services/pads";
import { useModalStore } from "../../store/modal";

function PadContent() {
  const { id } = useParams();
  const [pad, setPad] = useState<IPad>();
  const navigate = useNavigate();
  const lockStatus = useModalStore((state) => state.modals.lock);

  useEffect(() => {
    if (id) {
      saveCurrentPad(id);
      getPadById(id).then((res) => {
        if (!res) return;

        setPad((prevPad) => ({
          ...prevPad,
          ...{
            content: res.content,
            cipherContent: res.cipherContent,
            createdAt: res.createdAt,
            tags: res.tags,
            title: res.title,
            uid: res.uid,
            updatedAt: res.updatedAt,
            folder: res.folder || "",
            cover: res.cover || "",
            id: res.id,
            shortDesc: res.shortDesc,
            important: res.important,
            lock: res.lock
          },
        }));
      });
    }
  }, [id]);

  const getContent = (pad: IPad) => {
    if (pad.cipherContent) {
      console.log(pad);
      return decryptText(pad.cipherContent);
    }
    return pad.content;
  };
  useEffect(() => {
    if (pad?.lock && !lockStatus) {
      navigate(`/app/pad/lock/${id}`)
    }
    // eslint-disable-next-line
  }, [pad])

  return (
    <>
      {pad && pad.content && id ? (
        <PadEditor data={pad} id={id} content={getContent(pad)} />
      ) : null}
    </>
  );
}

export default PadContent;
