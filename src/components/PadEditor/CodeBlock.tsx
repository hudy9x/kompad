import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { DiagramBlockCode } from "./DiagramBlockCode"

export const CodeBlock = (props: NodeViewProps) => {
 const codeBlock = () => {
  if (props.node.attrs.language === "mermaid") {
   return <DiagramBlockCode nodeViewProps={props} />
  } else if (props.node.attrs.language === "programming") {
   return (
    <NodeViewWrapper>
     <pre className="code-programming">
      <NodeViewContent as="code" ></NodeViewContent>
     </pre>
    </NodeViewWrapper>
   )
  }
 }
 return codeBlock()
}
