import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { auth, db } from "../libs/firebase"

export interface IPlan {
  id?: string
  uid: string
  maxRecord: number
  currentRecord: number
  maxStorageSize: number
  currentStorageSize: number
  expiredTime: Timestamp
}

export const MAX_STORAGE_SIZE = 2000 // GB

export const getPlanByUid = async (): Promise<IPlan | null> => {
  const uid = auth.currentUser?.uid

  if (!uid) {
    return null
  }

  try {
    const d = await getDoc(doc(db, "/plans", uid))
    if (d.exists()) {
      const data = d.data()

      return {
        id: d.id,
        uid: data.uid,
        maxRecord: data.maxRecord,
        currentRecord: data.currentRecord,
        expiredTime: data.expiredTime,
        maxStorageSize: data.maxStorageSize,
        currentStorageSize: data.currentStorageSize,
      }
    }

    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const decreasePlanRecord = async () => {
  try {
    const planData = await getPlanByUid()
    console.log("planData", planData)
    if (!planData) {
      return
    }

    const currentRecord = planData.currentRecord - 1
    await updatePlanByUid({
      currentRecord: currentRecord >= 0 ? currentRecord : 0,
    })
  } catch (error) {
    console.log("decreasePlanRecord ERROR", error)
  }
}

export const createFreePlan = async () => {
  const uid = auth.currentUser?.uid

  if (!uid) {
    return null
  }

  try {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    const expiredTime = Timestamp.fromDate(date)

    await setDoc(doc(db, `/plans`, uid), {
      uid,
      maxRecord: 20,
      currentRecord: 0,
      maxStorageSize: MAX_STORAGE_SIZE,
      currentStorageSize: 0,
      expiredTime: expiredTime,
    })
    return 1
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getCurrentStorageSize = async () => {
  const planData = await getPlanByUid()
  return planData?.currentStorageSize || 0
}

export const updatePlanByUid = async (planData: Partial<IPlan>) => {
  const uid = auth.currentUser?.uid

  if (!uid) {
    return null
  }

  try {

    const data: {
      [key: string]: any
    } = {}

    if (planData.currentRecord && planData.currentRecord > 0) {
      data.currentRecord = planData.currentRecord
    }

    if (planData.currentStorageSize) {
      data.currentStorageSize = planData.currentStorageSize
    }

    if (data.currentStorageSize && data.currentRecord) return

    await updateDoc(doc(db, "/plans", uid), data)

    // await updateDoc(doc(db, "/plans", uid), {
    //   currentRecord: currentRecord >= 0 ? currentRecord : 0,
    //   currentStorageSize: planData.currentStorageSize || 0,
    // })

    return 1
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const hasReachedSizeLimit = async (): Promise<boolean | string> => {
  try {
    const planData = await getPlanByUid()

    if (!planData) {
      return true
    }

    const currentSize = planData.currentStorageSize
    const maxSize = planData.maxStorageSize || MAX_STORAGE_SIZE

    if (currentSize > maxSize) {
      return true
    }

    return false
  } catch (error) {
    return true
  }
}

export const isPlanExceed = async (): Promise<IPlan | string> => {
  try {
    const planData = await getPlanByUid()

    if (!planData) {
      return Promise.reject("PLAN_DOES_NOT_EXIST")
    }

    const currentSize = planData.currentStorageSize
    const maxSize = planData.maxStorageSize || MAX_STORAGE_SIZE

    if (currentSize > maxSize) {
      return Promise.reject("EXCEED_STORAGE_PLAN")
    }

    if (planData.currentRecord >= planData.maxRecord) {
      return Promise.reject("EXCEED_PLAN")
    }

    return planData
  } catch (error) {
    return Promise.reject("CHECKING_PLAN_ERROR")
  }
}
