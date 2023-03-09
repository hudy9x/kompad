import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";
import { decryptText } from "../../services/encryption";
import { getPadById, IPad, saveCurrentPad } from "../../services/pads";

function PadContent() {
  const { id } = useParams();
  const [pad, setPad] = useState<IPad>();

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

  return (
    <>
      {pad && pad.content && id ? (
        <PadEditor data={pad} id={id} content={getContent(pad)} />
      ) : null}
    </>
  );
}

export default PadContent;
