import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { HiOutlinePaperClip } from "react-icons/hi"
import Button from "../../components/Button"
import { getAllFileByUser, IFile } from "../../services/files"

const FileManager = () =>  {
  const [files, setFiles] = useState<IFile[]>([])
  const [next, setNext] = useState<QueryDocumentSnapshot<DocumentData>|null>(null)

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

  useEffect(() => {
    loadFile()
    // eslint-disable-next-line
  }, [])

  return <div className="shadow border border-color-base sm:rounded-md sm:overflow-hidden">
    <div className="advanced-setting-card">
      <h2 className="title">All files in your pad are listed here !</h2>
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
}

export default FileManager
