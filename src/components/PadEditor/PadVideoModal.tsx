import { Editor } from "@tiptap/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import useInputAutoFocus from "../../hooks/useInputAutoFocus";
import { message } from "../message";
import Modal from "../Modal";

export default function PadVideoModal({ editor }: { editor: Editor }) {
  const inpRef = useInputAutoFocus()
  const [visible, setvisible] = useState(false)
  const formik = useFormik({
    initialValues: {
      link: ""
    },
    onSubmit: ({ link }) => {
      if (!link) {
        message.error("Please input video link!")
        return
      }

      editor.commands.setYoutubeVideo({
        src: link
      })

      setvisible(false)
    }
  })

  useEffect(() => {
    !visible && formik.setFieldValue('link', '')
    // eslint-disable-next-line
  }, [visible])

  return <>
    <button
      onClick={() => setvisible(true)}
    >
      <AiOutlineYoutube className="control-icon" />
    </button>
    <Modal visible={visible} setVisible={setvisible} >
      <form className="w-[450px]" onSubmit={formik.handleSubmit} >
        <div className="form-control no-icon">
          <label htmlFor="pad-title" className="block text-sm font-medium ">
            Paste youtube link below <span className="underline">or directly inside the editor</span>
          </label>
          <div className="mt-1">
            <input
              ref={inpRef}
              type="text"
              name="link"
              id="pad-title"
              placeholder="Ex: https://www.youtube.com/watch?v=LUcUn-_KVXo&t=1034s"
              value={formik.values.link}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-block btn-lg">Insert</button>
        </div>

      </form>
    </Modal>
  </>
}
