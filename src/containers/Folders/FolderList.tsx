import { Unsubscribe } from "firebase/firestore"
import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { watchFolders } from "../../services/folders"
import { useFolderStore } from "../../store/folder"
import FolderItem from "./FolderItem"

function FolderList() {
  const { user } = useAuth()
  const { folders, updateFolders } = useFolderStore()

  useEffect(() => {
    let unsub: Unsubscribe | null
    if (user) {
      unsub = watchFolders((err, data) => {
        if (err) {
          return
        }

        updateFolders(data)
      })
    }

    return () => {
      unsub && unsub()
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <>
      {folders.map((folder) => {
        return <FolderItem key={folder.id} folder={folder} />
      })}
    </>
  )
}

export default FolderList
