import { updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";

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

export const updateUserById = async (uid: string, user: Partial<IUser>) => {
  try {
    const { fullname, photoURL, dateOfBirth, address } = user;
    await updateDoc(doc(db, "users", uid), {
      fullname,
      photoURL,
      dateOfBirth,
      address,
    });

    return 1;
  } catch (error) {
    console.log(error);
  }
  // const { uid, address, email, dateOfBirth, fullname, photoURL } = user;

  // await setDoc(doc(db, "users", uid || ""), {
  //   address,
  //   email,
  //   createdAt: Timestamp.now(),
  //   dateOfBirth: dateOfBirth,
  //   fullname,
  //   photoURL,
  //   status: EUserStatus.ACTIVE,
  // });

  // return 1;
};

export const changeUserPassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;

    if (!user) return 0;
    console.log(user);
    await updatePassword(user, newPassword);

    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getUser = async (uid: string): Promise<IUser | null> => {
  const user = await getDoc(doc(db, "users", uid));

  if (user.exists()) {
    return user.data() as IUser;
  } else {
    return null;
  }
};
