import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Diagram from '../components/Diagram'

export default Node.create({
  addNodeView() {
    return ReactNodeViewRenderer(Diagram)
  }
})

