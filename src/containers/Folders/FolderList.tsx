import { Unsubscribe } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getFolders, watchFolders } from "../../services/folders"
import {
  getQueryCache,
  QUERY_FOLDER,
  QUERY_FOLDER_TIME,
  setQueryCache,
  setQueryCounter,
  watchQuery,
} from "../../services/query-cache"
import { useFolderStore } from "../../store/folder"
import FolderItem from "./FolderItem"

function FolderList() {
  const { user } = useAuth()
  const { folders, updateFolders } = useFolderStore()

  const [cacheWatcher, triggerCacheWatcher] = useState(false)

  useEffect(() => {
    console.log("get data from cache ================")
    getQueryCache(QUERY_FOLDER).then((result: any) => {
      if (result) {
        console.log("update data from cache")
        updateFolders(result)
      }

      console.log("trigger cache watcher")
      triggerCacheWatcher(true)
    })
  }, [])

  const updateDataNCacheTime = () => {
    console.log("update data and cache time")
    getFolders().then((folders) => {
      updateFolders(folders)

      setQueryCounter("folders", (counter) => {
        setQueryCache(QUERY_FOLDER_TIME, counter)
        setQueryCache(QUERY_FOLDER, folders)
      })
    })
  }

  useEffect(() => {
    if (cacheWatcher && user) {
      console.log("start watching query")
      watchQuery((data) => {
        const cacheTime = data.folders
        console.log("query data", data)

        if (!cacheTime) {
          console.log("cache time is not exist")
          return updateDataNCacheTime()
        }

        getQueryCache(QUERY_FOLDER_TIME).then((localCacheTime) => {
          if (cacheTime === localCacheTime) {
            console.log("cache time is new, ignroe")
            return
          }

          console.log("cache time is staled, update")
          updateDataNCacheTime()
        })
      })
    }
  }, [cacheWatcher, user])

  // useEffect(() => {
  //   let unsub: Unsubscribe | null
  //   if (user) {
  //     unsub = watchFolders((err, data) => {
  //       if (err) {
  //         return
  //       }
  //
  //       updateFolders(data)
  //     })
  //   }
  //
  //   return () => {
  //     unsub && unsub()
  //   }
  //   // eslint-disable-next-line
  // }, [user])

  return (
    <>
      {folders.map((folder) => {
        return <FolderItem key={folder.id} folder={folder} />
      })}
    </>
  )
}

export default FolderList
