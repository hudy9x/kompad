import { deleteFile, getFileUrl, uploadFileToPad } from "../../services/files"
import { updatePadMetadata } from "../../services/pads"

interface Props {
  id: string
}

export default function PadCoverButton({ id }: Props) {

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const filePath = `pad-cover-${id}`
    const files = ev.target.files

    if (!files || !files.length) return;

    deleteFile(filePath).then(() => {
      uploadFileToPad(filePath, files[0]).then(getFileUrl).then(url => {
        console.log(url)
        updatePadMetadata({ id, cover: url }).then(res => console.log(res))
      })
    })
  }

  return <div className="pad-cover-upload absolute z-20 right-3 top-2 cursor-pointer shadow-md">
    <label htmlFor="pad-inp-update-cover" style={{ fontSize: '0.625rem' }}
      className="transition uppercase opacity-50 hover:opacity-100 cursor-pointer px-2 py-1 rounded-full">
      Change cover</label>
    <input onChange={onChange} id="pad-inp-update-cover" type="file" className="hidden" />
  </div>

}
