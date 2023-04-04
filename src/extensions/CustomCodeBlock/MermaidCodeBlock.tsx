import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { useEffect, useState } from "react"
import mermaid from "mermaid"
import { HiOutlineEye } from "react-icons/hi"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { guidGenerator } from "../../libs/utils"

const mermaidAPI = mermaid.mermaidAPI
mermaid.initialize({
  darkMode: false,
})

export const MermaidCodeBlock = ({
  nodeViewProps,
}: {
  nodeViewProps: NodeViewProps
}) => {
  const [html, setHTML] = useState<string>("")
  const handlePreview = () => {
    nodeViewProps.updateAttributes({
      isPreview: !nodeViewProps.node.attrs.isPreview,
    })
  }

  useEffect(() => {
    const id = guidGenerator()
    mermaidAPI
      .render(`graphDiv${id}`, nodeViewProps.node.textContent)
      .then((item) => {
        setHTML(item.svg)
      })
      .catch(() => {
        setHTML("Mermaid not found")
      })

    return () => {
      const element = document.getElementById(`dgraphDiv${id}`)
      if (!element) {
        return
      }
      element.remove()
    }
    // eslint-disable-next-line
  }, [nodeViewProps.node.attrs.isPreview, nodeViewProps.node.textContent])

  return (
    <NodeViewWrapper>
      <pre className="code-mermaid group">
        <div
          className="block-code-mermaid relative code-lang-title"
          title={"mermaid"}
        >
          <NodeViewContent
            as="code"
            className="container-block-code"
          ></NodeViewContent>
          <button
            className={`btn-preview group-hover:opacity-100`}
            onClick={handlePreview}
          >
            {nodeViewProps.node.attrs.isPreview ? (
              <HiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`mermaid-showcase ${
            nodeViewProps.node.attrs.isPreview ? "" : "hidden"
          }`}
        ></div>
      </pre>
    </NodeViewWrapper>
  )
}
