import { Timestamp } from "firebase/firestore"
import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { getFolders } from "../services/folders"
import {
  QUERY_FOLDER,
  QUERY_FOLDER_TIME,
  setQueryCache,
  setQueryCounter,
  watchQuery,
} from "../services/query-cache"
import { useFolderStore } from "../store/folder"

export default function QueryCaching() {
  const { user } = useAuth()
  const { updateFolders } = useFolderStore()

  useEffect(() => {
    const unsub = watchQuery((data) => {
      if (!data.folders) {
        getFolders().then((folders) => {
          setQueryCounter("folders", (counter) => {
            setQueryCache(QUERY_FOLDER_TIME, counter)
            setQueryCache(QUERY_FOLDER, folders)
          })
        })
      }
    })
    return () => {
      unsub && unsub()
    }
  }, [user])
  return <></>
}
