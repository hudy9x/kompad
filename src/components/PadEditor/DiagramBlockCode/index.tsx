import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useState, useEffect } from "react";
import mermaid from "mermaid";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";

const mermaidAPI = mermaid.mermaidAPI;
mermaid.initialize({
  darkMode: true
});


export const DiagramBlockCode = ({ content }: {
  content: string
}) => {
  const [preview, setPreview] = useState(false)
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
    <NodeViewWrapper className="diagram-component">
      <pre className="relative">
        <span
          className="cursor-pointer absolute right-0 pr-3 top-2 text-gray-100 flex items-center gap-2"
          onClick={() => setPreview(!preview)}
        >
          {preview ? (
            <HiOutlinePencil className="w-3 h-3" />
          ) : (
            <HiOutlineEye className="w-3 h-3" />
          )}
        </span>
        <NodeViewContent as="code" />
      </pre>
      <div
        className={`diagram-showcase ${preview && content ? "" : "hidden"}`}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </NodeViewWrapper>
  )
}