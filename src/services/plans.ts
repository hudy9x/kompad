import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";

export interface IPlan {
  id?: string;
  uid: string;
  maxRecord: number;
  currentRecord: number;
  expiredTime: Timestamp;
}

export const getPlanByUid = async (): Promise<IPlan | null> => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    return null;
  }

  try {
    const d = await getDoc(doc(db, "/plans", uid));
    if (d.exists()) {
      const data = d.data();

      return {
        id: d.id,
        uid: data.uid,
        maxRecord: data.maxRecord,
        currentRecord: data.currentRecord,
        expiredTime: data.expiredTime,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const decreasePlanRecord = async () => {
  try {
    const planData = await getPlanByUid();
    console.log("planData", planData);
    if (!planData) {
      return;
    }

    await updatePlanByUid({ currentRecord: planData.currentRecord - 1 });
  } catch (error) {
    console.log("decreasePlanRecord ERROR", error);
  }
};

export const createFreePlan = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    return null;
  }

  try {
    await setDoc(doc(db, `/plans`, uid), {
      uid,
      maxRecord: 20,
      currentRecord: 0,
      // expiredTime: dayjs
    });
    return 1;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePlanByUid = async (planData: Partial<IPlan>) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    return null;
  }

  try {
    const currentRecord = planData.currentRecord || 0;
    await updateDoc(doc(db, "/plans", uid), {
      currentRecord: currentRecord,
    });

    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
export const isPlanExceed = async (): Promise<IPlan | string> => {
  try {
    const planData = await getPlanByUid();

    if (!planData) {
      return Promise.reject("PLAN_DOES_NOT_EXIST");
    }

    if (planData.currentRecord >= planData.maxRecord) {
      return Promise.reject("EXCEED_PLAN");
    }

    return planData;
  } catch (error) {
    return Promise.reject("CHECKING_PLAN_ERROR");
  }
};
