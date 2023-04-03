import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { CodeBlock } from "./CodeBlock"

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      isPreview: {
        default: false,
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock)
  },
})
