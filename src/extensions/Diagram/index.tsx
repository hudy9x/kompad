import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Diagram from './Extension'

export default Node.create({
  name: 'reactComponent',
  group: 'block',
  content: 'inline*',
  atom: true,
  parseHTML() {
    return [
      {
        tag: 'react-component',
        getAttrs(node) {
          console.log(node)
          return {
            name: 1
          }
        },
      }      
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(Diagram)
  }
})

