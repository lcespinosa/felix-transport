// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: "felix-transport.firebaseapp.com",
  projectId: "felix-transport",
  storageBucket: "felix-transport.appspot.com",
  messagingSenderId: "885203503153",
  appId: process.env.FIRESTORE_APP_ID,
  measurementId: "G-7VJTGXRDCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const dbInstance = (collectionName) => collection(database, collectionName);

export {
  app,
  database,
  dbInstance,
  addDoc,
}
