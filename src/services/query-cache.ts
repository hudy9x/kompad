import { doc, onSnapshot, runTransaction } from "firebase/firestore"
import localforage from "localforage"
import { auth, db } from "../libs/firebase"

// define cache name below ---------------
export const QUERY_FOLDER_FIELD = "folders"
export const QUERY_FOLDER = "QUERY_FOLDER"
export const QUERY_FOLDER_TIME = "QUERY_FOLDER_TIME"

export const QUERY_TAG_FIELD = "tags"
export const QUERY_TAG = "QUERY_TAG"
export const QUERY_TAG_TIME = "QUERY_TAG_TIME"
// define cache name above --------------

export interface IQueryCache {
  folders: number
  tags: number
}

const COLLECTION_NAME = "query-caching"

const cacheDb = localforage.createInstance({
  name: "query-caching",
})

export const setQueryCache = (name: string, data: any) => {
  return cacheDb.setItem(name, data)
}

export const clearQueryCache = (name: string) => {
  return cacheDb.setItem(name, "")
}

export const getQueryCache = (name: string) => {
  return cacheDb.getItem(name)
}

// at the first time, when the app loaded
// it will be registered a watcher
// for listening changes from `cache-query/:userId` document
// everytime there's a change it will do the update process
export const watchQuery = (cb: (data: IQueryCache) => void) => {
  const user = auth.currentUser

  if (!user) {
    throw new Error("User is null")
  }

  const q = doc(db, COLLECTION_NAME, user.uid)

  const unsub = onSnapshot(q, (qSnapshot) => {
    const respData = qSnapshot.data() || {}

    const data: IQueryCache = {
      folders: respData.folders,
      tags: respData.tags,
    }

    cb(data)
  })

  return unsub
}

// update the cache counter on `cache-query` collections
// after update process finished
// it will notify to all devices that
// there's new update available
// after that, app will re-fetch datas and update data to cache
export const updateQueryCounterFor = (
  name: string,
  cb?: (counter: number) => void
) => {
  const user = auth.currentUser
  if (!user) return

  runTransaction(db, async (transaction) => {
    const docRef = doc(db, COLLECTION_NAME, user.uid)
    const queryDoc = await transaction.get(docRef)

    if (!queryDoc.exists()) {
      transaction.set(docRef, { [name]: 1 })
      return
    }

    const dt = queryDoc.data() as IQueryCache
    const n = dt[name as keyof IQueryCache]

    // in case, `query-caching/:userId` not undefined
    // but one of fields is undefined
    // must checking isNaN
    let counter = isNaN(n) ? 0 : n
    counter += 1

    transaction.update(docRef, { [name]: counter })

    cb && cb(counter)
  })
}

// update counter for each collections
export const updateQueryCounterForFolders = () =>
  updateQueryCounterFor("folders")

export const updateQueryCounterForTags = () => updateQueryCounterFor("tags")
