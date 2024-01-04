import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import {} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBz5I9GenPJkWQipCMxWI2XmaOB0k8_EPA",
  authDomain: "online-course-503c7.firebaseapp.com",
  databaseURL: "https://online-course-503c7-default-rtdb.firebaseio.com",
  projectId: "online-course-503c7",
  storageBucket: "online-course-503c7.appspot.com",
  messagingSenderId: "1072455354364",
  appId: "1:1072455354364:web:c1f44bd778e2273a0f9479",
  measurementId: "G-MJNSJX1CJQ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realTimeDatabase = getDatabase(app);
export const auth = getAuth(app);
