import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../libs/firebase";

export interface IPad {
  id?: string;
  uid: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const getPadsByUid = async (uid: string): Promise<IPad[] | null> => {
  try {
    const q = query(collection(db, "pads"), where("uid", "==", uid));
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

export const addPad = async (uid: string) => {
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
