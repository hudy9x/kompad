import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { MermaidCodeBlock } from "./MermaidCodeBlock"

export const CodeBlock = (props: NodeViewProps) => {
  const codeBlock = () => {
    if (props.node.attrs.language === "mermaid") {
      return <MermaidCodeBlock nodeViewProps={props} />
    } else {
      return (
        <NodeViewWrapper>
          <pre
            className="code-programming relative code-lang-title"
            title={props.node.attrs.language}
          >
            <NodeViewContent as="code"></NodeViewContent>
          </pre>
        </NodeViewWrapper>
      )
    }
  }
  return codeBlock()
}
