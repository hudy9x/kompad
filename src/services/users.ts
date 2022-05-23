import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../libs/firebase";

export enum EUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUser {
  uid?: string;
  fullname: string;
  email: string;
  photoURL: string;
  address: string;
  dateOfBirth: Timestamp;
  createdAt?: Timestamp;
  status?: EUserStatus;
}

export const addUser = async (user: IUser) => {
  const { uid, address, email, dateOfBirth, fullname, photoURL } = user;

  await setDoc(doc(db, "users", uid || ""), {
    address,
    email,
    createdAt: Timestamp.now(),
    dateOfBirth: dateOfBirth,
    fullname,
    photoURL,
    status: EUserStatus.ACTIVE,
  });

  return 1;
};
