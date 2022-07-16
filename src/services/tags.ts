import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { auth, db } from "../libs/firebase";

export interface ITag {
  id?: string;
  title: string;
  color: string;
  uid: string;
}

const COLLECTION_NAME = "tags";

export const addTag = async (tags: Partial<ITag>) => {
  const user = auth.currentUser;

  if (!user) {
    return 0;
  }

  tags.uid = user.uid;

  await addDoc(collection(db, COLLECTION_NAME), tags);
  return tags;
};

export const watchTags = (
  cb: (err: boolean, data: ITag[]) => void
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
    const tags: ITag[] = [];

    qSnapshot.docs.forEach((doc) => {
      const data = doc.data();

      tags.push({
        id: doc.id,
        title: data.title,
        color: data.color,
        uid: data.uid,
      });
    });

    cb(false, tags);
  });

  return unsub;
};

export const delTag = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.log(error);
  }
};
