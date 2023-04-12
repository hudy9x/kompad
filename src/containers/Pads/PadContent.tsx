import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PadEditor from "../../components/PadEditor"
import {
  CURRENT_PAD_CONTENT,
  getCacheJSON,
  setCacheJSON,
} from "../../libs/localCache"
import { decryptText } from "../../services/encryption"
import { getPadById, IPad, saveCurrentPad } from "../../services/pads"

function PadContent() {
  // rendering pad's content at first
  const cachedPad = getCacheJSON(CURRENT_PAD_CONTENT) as IPad
  const { id } = useParams()
  const [pad, setPad] = useState<IPad>(cachedPad)

  useEffect(() => {
    if (id) {
      saveCurrentPad(id)

      getPadById(id).then((res) => {
        if (!res) return

        const data = {
          content: res.content,
          cipherContent: res.cipherContent,
          createdAt: res.createdAt,
          tags: res.tags,
          title: res.title,
          uid: res.uid,
          updatedAt: res.updatedAt,
          folder: res.folder || "",
          cover: res.cover || "",
          id: id,
          shortDesc: res.shortDesc,
          important: res.important,
        }

        if (
          cachedPad &&
          cachedPad.updatedAt &&
          data.updatedAt.seconds <= cachedPad.updatedAt.seconds &&
          cachedPad.id === id
        ) {
          console.log("no changes, do nothing")
          return
        }

        setCacheJSON(CURRENT_PAD_CONTENT, data)

        setPad((prevPad) => ({
          ...prevPad,
          ...data,
        }))
      })
    }
    //eslint-disable-next-line
  }, [id])

  const getContent = (pad: IPad) => {
    if (pad.cipherContent) {
      return decryptText(pad.cipherContent)
    }
    return pad.content
  }

  return (
    <>
      {pad && pad.content && id ? (
        <PadEditor data={pad} id={id} content={getContent(pad)} />
      ) : null}
    </>
  )
}

export default PadContent
