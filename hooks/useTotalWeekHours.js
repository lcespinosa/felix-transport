import {dbInstance} from "../lib/firebaseConfig";
import {getDocs, query, where} from "firebase/firestore";
import {useEffect, useState} from "react";

export default function useTotalWeekHours(year, quarter, week, user) {
  const [result, setResult] = useState(0);
  const collection = dbInstance("daily_reports");

  useEffect(() => {
    async function fetchDocs() {
      try {
        // Create a query against the collection.
        const q = query(
          collection,
          where("userId", "==", user.email),
          where("year", "==", year),
          where("quarter", "==", quarter),
          where("week", "==", week),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data())
          .reduce((acc, cur) => acc + cur.heures, 0);
        setResult(data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchDocs();
  }, [year, quarter, week])

  return result;
}
