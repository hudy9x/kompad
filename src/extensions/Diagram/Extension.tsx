import { NodeViewWrapper } from "@tiptap/react";
import mermaid from "mermaid";
import { useEffect, useState } from "react";

const randId = () => Math.round(Math.random() * 0xfffff).toString(16);
const mermaidAPI = mermaid.mermaidAPI;

export default function Diagram() {
  const [html, setHTML] = useState('')
  const [graph, setGraph] = useState('')

  useEffect(() => {

    if (graph) {
      mermaidAPI.render('string', graph, (svg) => {
        setHTML(svg)
      })
    } else {
      setHTML('')
    }
  }, [graph]);

  return (
    <NodeViewWrapper className="react-component">
      <span className="label">React component</span>
      <textarea name="" id="" value={graph} onChange={ev => setGraph(ev.target.value)} />
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </NodeViewWrapper>
  );
}

