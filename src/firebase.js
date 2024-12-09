// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { MY_API_KEY } from "../sensitive.config"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: MY_API_KEY,
  authDomain: "werghischords.firebaseapp.com",
  projectId: "werghischords",
  storageBucket: "werghischords.appspot.com",
  messagingSenderId: "1076229397941",
  appId: "1:1076229397941:web:7df23c4cac5600a3214dfc",
  measurementId: "G-37LVFDZG2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);