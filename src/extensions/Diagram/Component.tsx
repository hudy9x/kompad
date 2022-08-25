import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState, useEffect } from "react";
import mermaid from "mermaid";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";

const mermaidAPI = mermaid.mermaidAPI;
mermaid.initialize({
  darkMode: true
});

export default function DiagramComponent(props: NodeViewProps) {
  const [graph, setGraph] = useState(props.node.attrs.graph || "");
  const [html, setHTML] = useState("");
  const [preview, setPreview] = useState(false);

  const updateGraph = (graph: string) => {
    props.updateAttributes({
      graph,
    });
  };

  useEffect(() => {
    try {
      if (graph) {
        updateGraph(graph);
        mermaidAPI.render("string", graph, (svg) => {
          setHTML(svg);
        });
      } else {
        updateGraph("");
        setHTML("");
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [graph]);

  return (
    <NodeViewWrapper className="diagram-component">
      <span
        className="label cursor-pointer text-gray-100 flex items-center gap-2"
        onClick={() => setPreview(!preview)}
      >
        <span>Diagram</span>
        {preview ? (
          <HiOutlinePencil className="w-3 h-3" />
        ) : (
          <HiOutlineEye className="w-3 h-3" />
        )}
      </span>

      <div className="diagram-container">
        <textarea
          className={preview ? "hidden" : ""}
          style={{color: 'black'}}
          value={graph}
          onChange={(ev) => setGraph(ev.target.value)}
        />
        <div
          className={`diagram-showcase ${preview ? "" : "hidden"}`}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
      {/* <div className="content">
        <button onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>
      </div> */}
    </NodeViewWrapper>
  );
}
