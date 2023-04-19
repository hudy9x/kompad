import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore"
import { auth, db } from "../libs/firebase"
import { setCache } from "../libs/localCache"
import { IPadQuery } from "../store/pad"
import { message } from "../components/message"
import { Rules } from "../containers/PadActions/PadShareModal/types"
import { Editor } from "@tiptap/react"

export interface IPad {
  id?: string
  uid: string
  title: string
  shortDesc?: string
  tags: string[]
  folder?: string
  cover?: string
  content: string
  cipherContent: string
  sharedContent: string
  createdAt: Timestamp
  updatedAt: Timestamp
  important: boolean
  shared: ISharedPad
}

interface IUpdatedPad {
  id: string
  title?: string
  tags?: string[]
  folder?: string
  cover?: string
  updatedAt?: Timestamp
}

export interface IUserShare {
  fullName: string
  email: string
  photoURL: string
  isEdit: boolean
}

export interface ISharedPad {
  group: IUserShare[],
  emails: string[],
  edits: string[],
  accessLevel: Rules,
  note?: string,
}

export const defaultShared: ISharedPad = {
  group: [],
  emails: [],
  edits: [],
  accessLevel: Rules.Limit,
  note: "",
}
const COLLECTION_NAME = "pads"
const RECENT_LIMIT = 15

/**
 * Save current editting pad
 * Next time, when you opening Kompad
 * This value will be used for redirecting to the pad that you working on
 * @param id
 */
export const saveCurrentPad = (id: string) => {
  setCache("currentPad", id)
}

export const getPadsByUidQuery = (
  uid: string,
  callback: (pad: IPad[]) => void
) => {
  const q = query(
    collection(db, "pads"),
    where("uid", "==", uid),
    orderBy("updatedAt", "desc")
  )

  onSnapshot(q, (pads) => {
    if (pads.empty) {
      return []
    }

    const padList: IPad[] = []
    pads.forEach((pad) => {
      const padData = pad.data() as IPad
      padList.push({
        id: pad.id,
        uid: padData.uid,
        title: padData.title,
        tags: padData.tags,
        content: padData.content,
        cipherContent: padData.cipherContent,
        sharedContent: padData.sharedContent,
        createdAt: padData.createdAt,
        updatedAt: padData.updatedAt,
        important: false,
        shared: defaultShared,
      })
    })

    callback(padList)
  })
}

export const getPadsByUid = async (uid: string): Promise<IPad[] | null> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("uid", "==", uid),
      orderBy("updatedAt", "desc")
    )
    const pads = await getDocs(q)

    if (pads.empty) {
      return []
    }

    const padList: IPad[] = []
    pads.forEach((pad) => {
      const padData = pad.data() as IPad
      padList.push({
        id: pad.id,
        uid: padData.uid,
        title: padData.title,
        tags: padData.tags,
        content: padData.content,
        cipherContent: padData.cipherContent,
        sharedContent: padData.sharedContent,
        createdAt: padData.createdAt,
        updatedAt: padData.updatedAt,
        important: false,
        shared: defaultShared,
      })
    })

    return padList
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getPadById = async (id: string): Promise<IPad | null> => {
  try {
    const pad = await getDoc(doc(db, COLLECTION_NAME, id))
    if (pad.exists()) {
      return pad.data() as IPad
    }

    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const watchPadById = (
  id: string,
  cb: (err: boolean, data?: IPad) => void
): Unsubscribe => {
  const unsub = onSnapshot(doc(db, COLLECTION_NAME, id), (pad) => {
    if (!pad.exists()) {
      cb(true)
      return
    }

    const padData = pad.data() as IPad
    padData.id = pad.id

    cb(false, padData)
  })

  return unsub
}

export const addPad = async ({ uid, title, shortDesc }: Partial<IPad>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      uid,
      title: title,
      shortDesc,
      tags: [],
      content: "Write something 💪🏻",
      cipherContent: "",
      shared: defaultShared,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return docRef.id
  } catch (error) {
    return null
  }
}

export const delPad = async (id: string) => {
  try {
    await deleteDoc(doc(db, "pads", id))
  } catch (error) {
    console.log(error)
  }
}

export const delTagByPadId = async (pid: string, tid: string) => {
  try {
    if (!pid || !tid) return 0

    const pad = await getDoc(doc(db, "pads", pid))
    if (!pad.exists()) return 0

    const padData = pad.data() as IPad

    await updateDoc(doc(db, "pads", pid), {
      tags: padData.tags.filter((t) => t !== tid),
    })

    return 1
  } catch (error) {
    console.log(error)
    return 0
  }
}
export const delFolderByPadId = async (pid: string) => {
  try {
    if (!pid) return 0

    await updateDoc(doc(db, "pads", pid), {
      folder: "",
    })

    return 1
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const quickAddPad = async (uid: string) => {
  try {
    const docRef = await addDoc(collection(db, "pads"), {
      uid,
      title: "Untitled",
      tags: [],
      content: "Write something 💪🏻",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return docRef.id
  } catch (error) {
    return null
  }
}

export const updatePad = async ({
  id,
  // title,
  content,
  cipherContent,
}: {
  id: string
  // title: string;
  content: string
  cipherContent: string
}) => {
  updateDoc(doc(db, "pads", id), {
    // content,
    cipherContent,
    // title,
    updatedAt: Timestamp.now(),
  })
}

export const updatePadMetadata = async ({
  id,
  title,
  tags,
  folder,
  cover,
}: IUpdatedPad) => {
  const data: Partial<IUpdatedPad> = {
    updatedAt: Timestamp.now(),
  }

  if (title) {
    data.title = title
  }

  if (tags && tags.length) {
    data.tags = tags
  }

  if (folder) {
    data.folder = folder
  }

  if (cover) {
    data.cover = cover
  }

  updateDoc(doc(db, "pads", id), data)
}

export const watchPads = (
  queries: IPadQuery,
  cb: (err: boolean, data: IPad[]) => void
): Unsubscribe | null => {
  const user = auth.currentUser

  if (!user) {
    cb(true, [])
    return null
  }

  const conds: QueryConstraint[] = [
    where("uid", "==", user.uid),
    //    orderBy("updatedAt", "desc"),
  ]

  if (queries.tag) {
    conds.push(where("tags", "array-contains", queries.tag))
  }

  if (queries.folder) {
    conds.push(where("folder", "==", queries.folder))
  }

  if (queries.important) {
    conds.push(where("important", "==", true))
  }

  if (queries.recently) {
    conds.push(orderBy("updatedAt", "desc"))
    conds.push(limit(RECENT_LIMIT))
  } else {
    conds.push(orderBy("createdAt", "desc"))
  }

  // if (queries.tag) {
  //   conds.push(where('tags', 'array-contains', queries.tag))
  // }

  // const q = query(
  //   collection(db, COLLECTION_NAME),
  //   where("uid", "==", user.uid),
  //   orderBy("updatedAt", "desc")
  // );

  let q
  if(queries.shared) {
    q = query(collection(db, COLLECTION_NAME), or(
      where('shared.emails', 'array-contains', user.email),
      and(
        where('shared.accessLevel', '==', Rules.Anyone),
        where('uid', '!=', user.uid),
      ) 
    ));   
  } else {
    q = query.apply(query, [collection(db, COLLECTION_NAME), ...conds])
  }

  const unsub = onSnapshot(q, (qSnapshot) => {
    const pads: IPad[] = []
    qSnapshot.docs.forEach((doc) => {
      const padData = doc.data() as IPad
      pads.push({
        id: doc.id,
        uid: padData.uid,
        title: padData.title,
        tags: padData.tags,
        folder: padData.folder,
        sharedContent: padData.sharedContent,
        content: padData.content,
        cipherContent: padData.cipherContent,
        createdAt: padData.createdAt,
        updatedAt: padData.updatedAt,
        important: padData.important,
        shared: padData.shared,
      })
    })
    cb(false, pads)
  })
  return unsub
}

export const setImportant = async (id: string) => {
  try {
    const selectedIDRef = doc(db, "pads", id)

    const pad = await getDoc(doc(db, "pads", id))
    if (!pad.exists()) return 0

    const padData = pad.data() as IPad
    if (padData.important) {
      message.success("Remove important")
    } else {
      message.success("Important pad successfully")
    }
    await updateDoc(selectedIDRef, {
      important: !padData.important,
    })
  } catch (err) {
    console.log(err)
    return 0
  }
}

export const setShared = async (reqShared: ISharedPad, id: string, editor: Editor) => {
  try {
    const selectedIDRef = doc(db, "pads", id)

    const pad = await getDoc(doc(db, "pads", id))
    if (!pad.exists()) return 0

    await updateDoc(selectedIDRef, {
      sharedContent: editor.getText(),
      shared: reqShared,
    })
  } catch (err) {
    console.log(err)
    return 0
  }
}

export const duplicatePad = async (id: string) => {
  try {
    const pad = await getDoc(doc(db, "pads", id))
    if (!pad.exists()) return 0

    const padData = pad.data() as IPad
    await addDoc(collection(db, COLLECTION_NAME), {
      ...padData,
      title: `${padData.title}-Copy`,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  } catch (err) {
    console.log(err)
    return 0
  }
}
