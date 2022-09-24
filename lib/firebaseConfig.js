// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "felix-transport.firebaseapp.com",
  projectId: "felix-transport",
  storageBucket: "felix-transport.appspot.com",
  messagingSenderId: "885203503153",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-7VJTGXRDCM"
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);
const database = getFirestore(Firebase);

const dbInstance = (collectionName) => collection(database, collectionName);

export {
  Firebase,
  auth,
  database,
  dbInstance,
}
