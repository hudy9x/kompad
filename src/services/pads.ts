import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../libs/firebase";
import { setCache } from "../libs/localCache";

export interface IPad {
  id?: string;
  uid: string;
  title: string;
  shortDesc?: string;
  tags: string[];
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Save current editting pad
 * Next time, when you opening Kompad
 * This value will be used for redirecting to the pad that you working on
 * @param id
 */
export const saveCurrentPad = (id: string) => {
  setCache("currentPad", id);
};

export const getPadsByUidQuery = (
  uid: string,
  callback: (pad: IPad[]) => void
) => {
  const q = query(
    collection(db, "pads"),
    where("uid", "==", uid),
    orderBy("updatedAt", "desc")
  );

  onSnapshot(q, (pads) => {
    if (pads.empty) {
      return [];
    }

    const padList: IPad[] = [];
    pads.forEach((pad) => {
      const padData = pad.data() as IPad;
      padList.push({
        id: pad.id,
        uid: padData.uid,
        title: padData.title,
        tags: padData.tags,
        content: padData.content,
        createdAt: padData.createdAt,
        updatedAt: padData.updatedAt,
      });
    });

    callback(padList);
  });
};

export const getPadsByUid = async (uid: string): Promise<IPad[] | null> => {
  try {
    const q = query(
      collection(db, "pads"),
      where("uid", "==", uid),
      orderBy("updatedAt", "desc")
    );
    const pads = await getDocs(q);

    if (pads.empty) {
      return [];
    }

    const padList: IPad[] = [];
    pads.forEach((pad) => {
      const padData = pad.data() as IPad;
      padList.push({
        id: pad.id,
        uid: padData.uid,
        title: padData.title,
        tags: padData.tags,
        content: padData.content,
        createdAt: padData.createdAt,
        updatedAt: padData.updatedAt,
      });
    });

    return padList;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPadById = async (id: string): Promise<IPad | null> => {
  try {
    const pad = await getDoc(doc(db, "pads", id));
    if (pad.exists()) {
      return pad.data() as IPad;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addPad = async ({ uid, title, shortDesc }: Partial<IPad>) => {
  try {
    const docRef = await addDoc(collection(db, "pads"), {
      uid,
      title: title,
      shortDesc,
      tags: [],
      content: "Write something 💪🏻",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    return null;
  }
};

export const delPad = async (id: string) => {
  try {
    await deleteDoc(doc(db, "pads", id));
  } catch (error) {
    console.log(error);
  }
};

export const quickAddPad = async (uid: string) => {
  try {
    const docRef = await addDoc(collection(db, "pads"), {
      uid,
      title: "Untitled",
      tags: [],
      content: "Write something 💪🏻",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    return null;
  }
};

export const updatePad = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  updateDoc(doc(db, "pads", id), {
    content,
    title,
    updatedAt: Timestamp.now(),
  });
};
