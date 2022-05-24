import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../libs/firebase";

interface IPad {
  id?: string;
  uid: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const getPadsByUid = async (uid: string) => {
  try {
    const q = query(collection(db, "pads"), where("uid", "==", uid));
    const pads = await getDocs(q);
  } catch (error) {}
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
