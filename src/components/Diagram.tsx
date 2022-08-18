import { NodeViewWrapper } from '@tiptap/react'
import mermaid from 'mermaid'
import { useEffect } from 'react'

const randId = () => Math.round((Math.random() * 0xfffff).toString(16))

export default function Diagram({ children }) {
  useEffect(() => {
    console.log(mermaid)
  })
  return <NodeViewWrapper className="react-component">
    <span className='label'>React component</span>
    <div className="content" >

    </div>

  </NodeViewWrapper>
}
