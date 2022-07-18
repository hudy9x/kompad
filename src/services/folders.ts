import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { auth, db } from "../libs/firebase";

export interface IFolder {
  id?: string;
  title: string;
  color: string;
  parentId: string;
  uid: string;
}

const COLLECTION_NAME = "folders";

export const addFolder = async (folder: Partial<IFolder>) => {
  const user = auth.currentUser;

  if (!user) {
    return 0;
  }

  folder.uid = user.uid;
  folder.parentId = "NONE";

  console.log(folder);

  await addDoc(collection(db, COLLECTION_NAME), folder);
  return folder;
};

export const getFolders = async (): Promise<IFolder[]> => {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const q = query(
    collection(db, COLLECTION_NAME),
    where("uid", "==", user.uid)
  );

  const result = await getDocs(q);

  if (result.empty) {
    return [];
  }

  const folders: IFolder[] = [];

  result.docs.forEach((doc) => {
    const data = doc.data();

    folders.push({
      id: doc.id,
      title: data.title,
      color: data.color,
      parentId: data.parentId,
      uid: data.uid,
    });
  });

  return folders;
};

export const watchFolders = (
  cb: (err: boolean, data: IFolder[]) => void
): Unsubscribe | null => {
  const user = auth.currentUser;

  if (!user) {
    cb(true, []);
    return null;
  }

  const q = query(
    collection(db, COLLECTION_NAME),
    where("uid", "==", user.uid)
  );

  const unsub = onSnapshot(q, (qSnapshot) => {
    const folders: IFolder[] = [];

    qSnapshot.docs.forEach((doc) => {
      const data = doc.data();

      folders.push({
        id: doc.id,
        title: data.title,
        color: data.color,
        parentId: data.parentId,
        uid: data.uid,
      });
    });

    cb(false, folders);
  });

  return unsub;
};

export const delFolder = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.log(error);
  }
};
