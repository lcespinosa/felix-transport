import {dbInstance} from "../lib/firebaseConfig";
import {addDoc} from "firebase/firestore";

export const addDailyReportDocument = async (year, quarter, week, day, user, data) => {
  const collection = dbInstance("daily_reports");
  console.log('save ', year, quarter, week, day, user, data)

  await addDoc(collection, {
    year,
    quarter,
    week,
    day,
    userId: user,
    ...data,
  });
};
