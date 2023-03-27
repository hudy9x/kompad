import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState, useEffect } from "react";
import mermaid from "mermaid";
import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const mermaidAPI = mermaid.mermaidAPI;
mermaid.initialize({ startOnLoad: true });

export const DiagramBlockCode = ({ nodeViewProps }: {
  nodeViewProps: NodeViewProps
}) => {
  const [html, setHTML] = useState<string>("")

  const handlePreview = () => {
    console.log("DONE");
    nodeViewProps.updateAttributes({
      isPreview: !nodeViewProps.node.attrs.isPreview,
    })
  }

  useEffect(() => {
    try {
      const element = document.querySelector('#graphDiv');
      mermaidAPI.render("graphDiv", nodeViewProps.node.textContent).then((item) => {
        setHTML(item.svg)
        if(!element) {
          return;
        }
        if (item.bindFunctions) {
          item.bindFunctions(element);
        }
      });

    } catch (error: any) {
      setHTML(error.str)
      console.log(error)
    }
  }, [nodeViewProps.node.attrs.isPreview, nodeViewProps.node.textContent])

  return (
    <NodeViewWrapper>
      <pre className="code-mermaid">
        <div className="block-code-mermaid">
          <NodeViewContent as="code" className="container-block-code">
          </NodeViewContent>
          <div className="content">
          </div>
          <button
            className={`cursor-pointer flex`}
            onClick={handlePreview}
          >
            {nodeViewProps.node.attrs.isPreview ? (
              <HiOutlineEye className="block-code-icon" />
            ) : (
              <AiOutlineEyeInvisible className="block-code-icon" />
            )}
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`diagram-showcase ${nodeViewProps.node.attrs.isPreview ? "" : "hidden"}`}
        ></div>
      </pre>
    </NodeViewWrapper>
  )
}
