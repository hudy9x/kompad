import { Timestamp } from "firebase/firestore";

export const toTimestame = (d: string) => {
  return Timestamp.fromDate(new Date(d));
};
