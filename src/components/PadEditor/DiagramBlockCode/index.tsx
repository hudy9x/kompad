import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import mermaid from "mermaid";
import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { guidGenerator } from "../../../libs/utils";

const mermaidAPI = mermaid.mermaidAPI;
mermaid.initialize({
  darkMode: true
});

export const DiagramBlockCode = ({ nodeViewProps }: {
  nodeViewProps: NodeViewProps
}) => {
  const [html, setHTML] = useState<string>('');
  const handlePreview = () => {
    nodeViewProps.updateAttributes({
      isPreview: !nodeViewProps.node.attrs.isPreview,
    })
  }

  useEffect(() => {
      const id = guidGenerator();
      mermaidAPI.render(`graphDiv${id}`, nodeViewProps.node.textContent).then((item) => {
        setHTML(item.svg);
      }).catch(() => {
        setHTML("Mermaid not found");
      });

      return(() => {
        const element = document.getElementById(`dgraphDiv${id}`);
        if(!element) {
          return;
        }
        element.remove();
      })
     // eslint-disable-next-line
  }, [nodeViewProps.node.attrs.isPreview, nodeViewProps.node.textContent])

  return (
    <NodeViewWrapper>
      <pre className="code-mermaid">
        <div className="block-code-mermaid">
          <NodeViewContent as="code" className="container-block-code">
          </NodeViewContent>
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
          dangerouslySetInnerHTML={{ __html: html}}
          className={`mermaid-showcase ${nodeViewProps.node.attrs.isPreview ? "" : "hidden"}`}
        ></div>
      </pre>
    </NodeViewWrapper>
  )
}
