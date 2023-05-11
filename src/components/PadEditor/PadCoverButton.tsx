import { Timestamp } from "firebase/firestore"
import { ChangeEvent, useState } from "react"
import { HiOutlinePhotograph } from "react-icons/hi"
import { useAuth } from "../../hooks/useAuth"
import {
  addFileInfo,
  deleteCoverImageFile,
  deleteFile,
  getFileUrl,
  uploadFileToPad,
} from "../../services/files"
import { updatePadMetadata } from "../../services/pads"
import { message } from "../message"
import Modal from "../Modal"

interface Props {
  id: string
}

export default function PadCoverButton({ id }: Props) {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState("")

  const onInputImageLink = (ev: ChangeEvent<HTMLInputElement>) => {
    const imageUrl = ev.target.value

    setUrl(imageUrl)
  }

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
            updatePadMetadata({ id, cover: url })
              .then((res) => {
                message.success("Upload image cover succesfully")
              })
              .catch((err) => {
                message.error("Update image cover failed")
              })
          })
      })
    })
  }

  const onSaveImageLink = () => {
    if (user && url && id) {
      updatePadMetadata({ id, cover: url })
        .then((res) => {
          message.success("Update image cover succesfully")
        })
        .catch((err) => {
          message.error("Update image cover failed")
        })
        .finally(() => {
          setVisible(false)
          setUrl("")
        })
    }
  }

  return (
    <div className="pad-cover-upload absolute z-20 right-3 top-2 cursor-pointer shadow-md">
      <div className="group">
        <button className="btn btn-primary uppercase text-2xs">
          Change cover
        </button>
        <div className="hidden group-hover:block text-2xs uppercase mt-1 bg border border-color-base rounded-md">
          <div className="px-3 py-2 cursor-pointer">
            <label htmlFor="pad-inp-update-cover" className="cursor-pointer" >Upload</label>
            <input
              onChange={onChange}
              id="pad-inp-update-cover"
              type="file"
              className="hidden"
            />
          </div>
          <div
            className="px-3 py-2 cursor-pointer"
            onClick={() => {
              setVisible(true)
            }}
          >
            Link
          </div>
        </div>
      </div>
      <Modal visible={visible} setVisible={setVisible}>
        <div className="form-control col-span-3 w-72">
          <label htmlFor="url">
            <span>Input your image link</span>
            <p className="text-xs py-2" >Ex: Go to <a rel="noreferrer" target={"_blank"} className="text-color-primary hover:underline" href="https://www.pexels.com/">pexels.com</a> or <a rel="noreferrer" className="text-color-primary hover:underline" target={"_blank"} href="https://unsplash.com/">unsplash.com</a>, right click on your favorited image and paste it into the input below</p>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="form-icon">
              <HiOutlinePhotograph
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="url"
              id="url"
              placeholder="https://..."
              onChange={onInputImageLink}
              value={url}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="btn btn-primary" onClick={onSaveImageLink}>
            Save
          </button>
          <button className="btn" onClick={() => setVisible(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}
