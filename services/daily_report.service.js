import {database, dbInstance} from "../lib/firebaseConfig";
import {addDoc, updateDoc, doc} from "firebase/firestore";

export const addDailyReportDocument = async (year, quarter, week, day, user, data) => {
  const collection = dbInstance("daily_reports");
  const {id, ...otherData} = data;
  const docData = {
    year,
    quarter,
    week,
    day,
    userId: user,
    ...otherData,
  };

  if (id) {
    const docRef = doc(database, 'daily_reports', id);
    console.log(docRef)
    await updateDoc(docRef, docData);
  } else {
    await addDoc(collection, docData);
  }
};
