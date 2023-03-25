import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { DiagramBlockCode } from "./DiagramBlockCode"

export const CodeBlock = (props: NodeViewProps) => {
 return props.node.attrs.language === "diagram" ? <DiagramBlockCode content={props.node.textContent} /> : <NodeViewWrapper>
  <pre className="code-programming">
   <NodeViewContent as="code" ></NodeViewContent>
  </pre>
 </NodeViewWrapper>
}