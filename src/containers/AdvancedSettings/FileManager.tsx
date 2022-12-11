import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { HiOutlinePaperClip } from "react-icons/hi"
import { MdBattery20, MdBattery90 } from "react-icons/md"
import Button from "../../components/Button"
import { getAllFileByUser, IFile } from "../../services/files"
import { getCurrentStorageSize, MAX_STORAGE_SIZE } from "../../services/plans"

const FileManager = () => {
  const [files, setFiles] = useState<IFile[]>([])
  const [size, setSize] = useState(0)
  const [next, setNext] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)

  const viewMore = () => {
    loadFile()
  }

  const loadFile = useCallback(() => {
    getAllFileByUser(next || undefined).then(res => {
      const { lastDoc, data } = res;
      setFiles(prev => [...prev, ...data])
      setNext(lastDoc)
    })
  }, [next])

  const getStorageSize = () => {
    getCurrentStorageSize().then(size => {
      setSize(size)
    })
  }

  useEffect(() => {
    loadFile()
    getStorageSize()
    // eslint-disable-next-line
  }, [])

  return <div className="shadow border border-color-base sm:rounded-md sm:overflow-hidden">
    <div className="advanced-setting-card px-0">
      <div className="flex items-center justify-around border-b border-color-base pb-4">
        <div className="box flex items-center gap-2">
          <MdBattery90 className="w-12 h-12 text-green-400"/>
          <div>
            <h2 className="title">Remaining</h2>
            <p className="text-2xl font-extrabold">{(MAX_STORAGE_SIZE - size).toFixed(2)}mb</p>
          </div>
        </div>
          <div className="box flex items-center gap-2">
            <MdBattery20 className="w-12 h-12 text-green-200"/>
            <div>
              <h2 className="title">Used</h2>
              <p className="text-2xl font-extrabold">{size.toFixed(2)}mb</p>
            </div>
        </div>
      </div>
        <div className="px-6 space-y-3">

      {files.map(file => {
        return <div key={file.id} className="file-item flex items-center gap-2">
          <HiOutlinePaperClip />
          <span>{file.name}</span>
          <small className="bg-light rounded-full px-2 py-0.5 text-2xs">{file.size.toFixed(2)} mb</small>
        </div>
      })}

      <Button onClick={viewMore}>View more file</Button>
      </div>
    </div>
  </div>
}

export default FileManager
