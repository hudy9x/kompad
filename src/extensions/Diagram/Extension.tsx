import { NodeViewWrapper } from "@tiptap/react";
import mermaid from "mermaid";
import { useEffect, useState } from "react";

const randId = () => Math.round(Math.random() * 0xfffff).toString(16);
const mermaidAPI = mermaid.mermaidAPI;

export default function Diagram() {
  const [graph, setGraph] = useState('')
  useEffect(() => {
    mermaid.contentLoaded()
  }, [graph]);

  return (
    <NodeViewWrapper className="react-component">
      <span className="label">React component</span>
      <textarea name="" id="" value={graph} onChange={ev => setGraph(ev.target.value)}/>
      <div className="mermaid mt-6 mx-auto" id="tessst">{graph}</div>
    </NodeViewWrapper>
  );
}
