import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useState, useEffect } from "react";
import mermaid from "mermaid";
import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useDiagramStore } from "../../../store/diagram";


const mermaidAPI = mermaid.mermaidAPI;
mermaid.initialize({
  darkMode: true
});


export const DiagramBlockCode = ({ content }: {
  content: string
}) => {
  const { setIsPreview, isPreview } = useDiagramStore();
  const [html, setHTML] = useState("")

  useEffect(() => {
    try {
      mermaidAPI.render("string", content, (svg) => {
        setHTML(svg)
      })
    } catch (error: any) {
      setHTML(error.str)
      console.log(error)
    }
  }, [content])

  return (
    <NodeViewWrapper>
      <pre className="code-mermaid">
        <div className="block-code-mermaid">
          <NodeViewContent as="code" className="container-block-code">
          </NodeViewContent>
          <button
            className={`cursor-pointer flex ${isPreview ? 'is-active' : ''}`}
            onClick={() => setIsPreview()}
          >
            {isPreview ? (
              <HiOutlineEye className="block-code-icon" />
            ) : (
              <AiOutlineEyeInvisible className="block-code-icon" />
            )}
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`diagram-showcase ${isPreview ? "" : "hidden"}`}
        ></div>
      </pre>
    </NodeViewWrapper>
  )
}
