import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { DiagramBlockCode } from "./DiagramBlockCode"

export const CodeBlock = (props: NodeViewProps) => {
 console.log(props, "props");
 return props.node.attrs.language === "mermaid" ? <DiagramBlockCode nodeViewProps={props} /> : <NodeViewWrapper>
  <pre className="code-programming">
   <NodeViewContent as="code" ></NodeViewContent>
  </pre>
 </NodeViewWrapper>
}
