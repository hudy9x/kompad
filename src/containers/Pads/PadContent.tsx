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
  const { setIdShared } = usePadStore((state) => state)
  const cachedPad = getCacheJSON(CURRENT_PAD_CONTENT) as IPad
  const { query } = usePadListStore()
  const { id } = useParams()
  const [pad, setPad] = useState<IPad>(cachedPad)

  useEffect(() => {
    if (id) {
      saveCurrentPad(id)

      getPadById(id).then((res) => {
        if (!res) return
        const data: IPad = {
          content: res.content,
          cipherContent: res.cipherContent,
          createdAt: res.createdAt,
          tags: res.tags,
          title: res.title,
          uid: res.uid,
          updatedAt: res.updatedAt,
          folder: res.folder || "",
          searchId: res.searchId || "",
          cover: res.cover || "",
          id: id,
          sharedContent: res.sharedContent,
          shared: res.shared,
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
        setIdShared("")
        setPad((prevPad) => ({
          ...prevPad,
          ...data,
        }))
      })
    }
    //eslint-disable-next-line
  }, [id])

  const getContent = (pad: IPad) => {
    const enabledIfShared = query.shared;
    if(enabledIfShared && pad.sharedContent) {
      return pad.sharedContent
    } else {
      return decryptText(pad.cipherContent)
    }
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
