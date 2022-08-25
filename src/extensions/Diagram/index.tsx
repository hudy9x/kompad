import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import "./style.css";
import Component from "./Component";

export default Node.create({
  name: "diagramComponent",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      graph: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "diagram-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["diagram-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
