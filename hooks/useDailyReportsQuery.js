// noinspection JSCheckFunctionSignatures

import {useEffect, useState} from "react";
import {dbInstance} from "../lib/firebaseConfig";
import {query, where, getDocs} from "firebase/firestore";

export default function useDailyReportsQuery(year, quarter, week, day, user) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const collection = dbInstance("daily_reports");

  useEffect(() => {
    async function fetchDocs() {
      try {
        setLoading(true);
        // Create a query against the collection.
        const q = query(
          collection,
          where("userId", "==", user.email),
          where("year", "==", year),
          where("quarter", "==", quarter),
          where("week", "==", week),
          where("day", "==", day),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data)
        setResult(data[0]);
        setLoading(false);
        setError(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    }

    fetchDocs();
  }, [year, quarter, week, day])

  return [result, loading, error];
}
