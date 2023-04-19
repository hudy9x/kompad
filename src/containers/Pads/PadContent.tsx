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
import { usePadStore } from "../../store"
import { usePadListStore } from "../../store/pad"

function PadContent() {
  // rendering pad's content at first
  const { idShared, setIdShared } = usePadStore((state) => state)
  const cachedPad = getCacheJSON(CURRENT_PAD_CONTENT) as IPad
  const { id } = useParams()
  const { query } = usePadListStore()
  const [pad, setPad] = useState<IPad>(cachedPad)

  useEffect(() => {
    let idx = idShared || id;

    if (idx) {
      saveCurrentPad(idx)

      getPadById(idx).then((res) => {
        if (!res) return
        console.log(res)
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
          id: idx,
          shared: res.shared,
          shortDesc: res.shortDesc,
          important: res.important,
        }

        if (
          cachedPad &&
          cachedPad.updatedAt &&
          data.updatedAt.seconds <= cachedPad.updatedAt.seconds &&
          cachedPad.id === idx
        ) {
          console.log("no changes, do nothing")
          return
        }

        setCacheJSON(CURRENT_PAD_CONTENT, data)
        setIdShared("")
        setPad((prevPad) => ({
          ...prevPad,
          ...data,
        }))
      })
    }
    //eslint-disable-next-line
  }, [id, idShared])

  const getContent = (pad: IPad) => {
    // if(shared) {
    //   return pad.shared.sharedContent
    // }
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
