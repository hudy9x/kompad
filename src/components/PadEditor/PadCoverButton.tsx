import { Timestamp } from "firebase/firestore"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
  addFileInfo,
  deleteCoverImageFile,
  deleteFile,
  getFileUrl,
  uploadFileToPad,
} from "../../services/files"
import { updatePadMetadata } from "../../services/pads"
import Modal from "../Modal"

interface Props {
  id: string
}

export default function PadCoverButton({ id }: Props) {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const filePath = `pad-cover-${id}`
    const files = ev.target.files

    if (!user) return

    if (!files || !files.length) return

    deleteCoverImageFile({
      createdBy: user.uid,
      padId: id,
      source: "COVER-IMAGE",
    }).then(() => {
      deleteFile(filePath).then(() => {
        const file = files[0]
        uploadFileToPad(filePath, file)
          .then(getFileUrl)
          .then((url) => {
            const path = `pads/${user.uid}/${filePath}`
            addFileInfo({
              name: file.name,
              size: file.size / 1024 / 1024,
              url,
              path: path,
              type: file.type,
              padId: id,
              createdAt: Timestamp.now(),
              createdBy: user.uid,
              source: "COVER-IMAGE",
            })
            updatePadMetadata({ id, cover: url }).then((res) =>
              console.log(res)
            )
          })
      })
    })
  }

  return (
    <div className="pad-cover-upload absolute z-20 right-3 top-2 cursor-pointer shadow-md">
      <button
        className="btn btn-primary uppercase text-2xs"
        onClick={() => {
          setVisible(true)
        }}
      >
        Change cover
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <label
          htmlFor="pad-inp-update-cover"
          style={{ fontSize: "0.625rem" }}
          className="transition uppercase opacity-50 hover:opacity-100 cursor-pointer px-2 py-1 rounded-md"
        >
          Change cover
        </label>
        <input
          onChange={onChange}
          id="pad-inp-update-cover"
          type="file"
          className="hidden"
        />
      </Modal>
    </div>
  )
}
