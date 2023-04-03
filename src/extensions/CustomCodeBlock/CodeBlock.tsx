import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { MermaidCodeBlock } from "./MermaidCodeBlock"

export const CodeBlock = (props: NodeViewProps) => {
  const codeBlock = () => {
    if (props.node.attrs.language === "mermaid") {
      return <MermaidCodeBlock nodeViewProps={props} />
    } else {
      return (
        <NodeViewWrapper>
          <pre className="code-programming relative">
            <span className="code-language-title">
              {props.node.attrs.language}
            </span>
            <NodeViewContent as="code"></NodeViewContent>
          </pre>
        </NodeViewWrapper>
      )
    }
  }
  return codeBlock()
}
