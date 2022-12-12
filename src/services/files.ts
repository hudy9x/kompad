import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, startAfter, Timestamp, where } from "firebase/firestore";
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { message } from "../components/message";
import { auth, db, storage } from "../libs/firebase";
import { getCacheArray, setCacheJSON } from "../libs/localCache";
import { getPlanByUid, MAX_STORAGE_SIZE, updatePlanByUid } from "./plans";

type TUploadFileFunc = (filePath: string, file: File | Blob) => Promise<string>
export interface IFile {
  id?: string
  name: string
  path: string // path to file in firebase storage
  url: string
  size: number
  type: string
  createdBy: string
  createdAt: Timestamp
  padId: string
  source: string
}

const COLLECTION_NAME = 'files';

// size: shourld be converted to mb at first
const _calculateStorageSize = async (size: number) => {
  const planData = await getPlanByUid()
  if (!planData) {
    console.log('planData is empty')
    return
  }

  const currentStorageSize = (planData.currentStorageSize || 0) + size
  const roundedSize = currentStorageSize >= 0 ? currentStorageSize : 0

  await updatePlanByUid({
    currentStorageSize: roundedSize
  })

  _maximumStorageWarning(roundedSize)
  console.log('updated current storage size')
}

const _maximumStorageWarning = (size: number) => {
  if (size > MAX_STORAGE_SIZE) {
    message.warning("Your storage size reached to the limit")
  }
}

const _uploadFile: TUploadFileFunc = (filePath, file) => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, filePath);
    uploadBytes(fileRef, file).then(() => {
      _calculateStorageSize(file.size / 1024 / 1024)
      resolve(filePath)
    }).catch((error) => {
      console.log('_uploadFile', error)
      reject('ERROR')
    })
  })

};

// Create a reference under which you want to list
const listRef = ref(storage, "avatars/public");

export const addFileInfo = async (file: IFile) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), file);
  } catch (error) {
    console.log(error)
  }
}

export const deleteFileInfo = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id))
}

export const getAllPublicAvatars = () => {
  const key = "PUBLIC_AVATAR";
  return new Promise<string[]>((resolve, reject) => {
    const cachedPublicAvatars = getCacheArray(key);
    if (cachedPublicAvatars) {
      resolve(cachedPublicAvatars);
      return;
    }

    // Find all the prefixes and items.
    listAll(listRef)
      .then(async (res) => {
        const promise: Promise<string>[] = [];

        res.items.forEach((itemRef) => {
          promise.push(getDownloadURL(itemRef));
        });

        const urls = await Promise.all(promise);

        setCacheJSON(key, urls);
        resolve(urls);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadFileToPad = (filePath: string, file: File | Blob): ReturnType<TUploadFileFunc> => {
  const user = auth.currentUser
  if (!user || !user.uid) return Promise.resolve('ERROR');

  const { uid } = user;
  const path = `pads/${uid}/${filePath}`;

  return _uploadFile(path, file)
}

export const deleteCoverImageFile = async (file: Partial<IFile>) => {
  const q = query(collection(db, COLLECTION_NAME),
    where("createdBy", "==", file.createdBy),
    where("padId", "==", file.padId),
    where("source", "==", "COVER-IMAGE"))
  const snapshots = await getDocs(q)

  if (snapshots.empty) {
    return 0;
  }

  snapshots.forEach(doc => {
    deleteDoc(doc.ref)
    _calculateStorageSize(-(file.size || 0))
  })

  return 1;
}

interface IFileResults {
  lastDoc: QueryDocumentSnapshot<DocumentData> | null,
  data: IFile[]
}

type GetAllFileFunc = (
  fromDoc?: QueryDocumentSnapshot<DocumentData>
) => Promise<IFileResults>

export const getAllFileByUser: GetAllFileFunc = async (fromDoc) => {
  const user = auth.currentUser
  if (!user || !user.uid) return { lastDoc: null, data: [] };

  let q;
  const dbConn = collection(db, COLLECTION_NAME)
  const cond = where("createdBy", "==", user.uid)
  const maxRecord = limit(20)

  if (!fromDoc) {
    q = query(dbConn, cond, maxRecord
    );
  } else {
    q = query(dbConn, cond, startAfter(fromDoc), maxRecord)
  }

  const snapshot = await getDocs(q)
  if (snapshot.empty) {
    return { lastDoc: null, data: [] }
  }

  const files: IFile[] = []
  const lastDoc = snapshot.docs[snapshot.docs.length - 1]
  snapshot.forEach(doc => {
    const data = doc.data() as IFile
    files.push({
      id: doc.id,
      name: data.name,
      path: data.path,
      url: data.url,
      size: data.size,
      type: data.type,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
      padId: data.padId,
      source: data.source
    })
  })

  return {
    lastDoc,
    data: files
  };
}

export const deleteAllImageInOnePad = async (padId: string) => {
  const user = auth.currentUser
  if (!user || !user.uid) return 0;

  console.log('called deleteAllImageInOnePad', padId)
  const q = query(collection(db, COLLECTION_NAME),
    where("createdBy", "==", user.uid),
    where("padId", "==", padId))
  const snapshots = await getDocs(q)

  if (snapshots.empty) {
    console.log('empty')
    return 0;
  }

  let totalSize = 0;
  snapshots.forEach(doc => {
    const data = doc.data() as IFile
    totalSize += data.size
    deleteFile(data.path).then(() => {
      console.log(`deleted file ${data.name} of pad ${data.padId}`)
      deleteDoc(doc.ref).then(() => {
        console.log('deleted file from storage')
      })
    });
  })

  _calculateStorageSize(-totalSize)

  return 1;
}

export const getFileUrl = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    getDownloadURL(ref(storage, filePath)).then((url) => {
      resolve(url)
    }).catch(err => {
      console.log('getFileUrl', err)
      reject('Error')
    })
  })
}

export const deleteFile = (filePath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, filePath)
    deleteObject(fileRef).then(() => {
      resolve(true)
    }).catch(err => {
      if (err.code === 'storage/object-not-found') {
        return resolve(true)
      }
      reject(false)
    })
  })
}

