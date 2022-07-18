import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";
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
          ...res,
        }));
      });
    }
  }, [id]);

  return (
    <>
      {pad && pad.content && id ? <PadEditor data={pad} id={id} content={pad.content} /> : null}
    </>
  );
}

export default PadContent;
