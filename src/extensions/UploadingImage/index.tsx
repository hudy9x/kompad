import Paragraph from "@tiptap/extension-paragraph"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customExtension: {
      /**
       * Comments will be added to the autocomplete.
       */
      addUploading: (id: string) => ReturnType
      removeUploading: (id: string, src: string) => ReturnType
    }
  }
}

export const UploadingImage = Paragraph.extend({
  // addAttributes: append new attributes for Paragraph
  // in the following code, we added `upload` and `uploadId` attributes
  // with default values
  addAttributes() {
    return {
      upload: {
        default: false,
      },
      uploadId: {
        default: "",
      },
    }
  },

  // addCommands: create new commands `addUploading` and `removeUploading`
  // now you can call these commands by `editor.commands.addUploading()`
  addCommands() {
    return {
      addUploading:
        (id) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: "paragraph",
              content: [{ type: "text", text: "Uploading" }],
              attrs: { upload: true, uploadId: id },
            },
          ])
        },
      removeUploading:
        (id, src) =>
        ({ commands, editor }) => {
          const json = editor.getJSON()
          const jsonContent = json.content || []

          const index = jsonContent.findIndex((content) => {
            return (
              content.type === "paragraph" &&
              content.attrs &&
              content.attrs.uploadId === id
            )
          })

          if (jsonContent[index]) {
            jsonContent[index] = {
              type: "image",
              attrs: {
                src,
              },
            }
          }

          return commands.setContent(jsonContent)
        },
    }
  },
})
