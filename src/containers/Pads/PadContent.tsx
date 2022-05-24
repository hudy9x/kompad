import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PadEditor from "../../components/PadEditor";
import { getPadById } from "../../services/pads";

function PadContent() {
  const { id } = useParams();
  const [pad, setPad] = useState({ title: "", content: "" });

  useEffect(() => {
    console.log(id);
    if (id) {
      getPadById(id).then((res) => {
        if (!res) return;

        setPad({
          title: res.title,
          content: res.content,
        });
      });
    }
  }, [id]);

  return (
    <>
      {pad.content && id ? <PadEditor id={id} content={pad.content} /> : null}
    </>
  );
}

export default PadContent;
