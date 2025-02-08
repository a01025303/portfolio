// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX2DqOmJO3BZjSOJjCpbCeMhtXgXJ2duk",
  authDomain: "portafolio-akemi.firebaseapp.com",
  projectId: "portafolio-akemi",
  storageBucket: "portafolio-akemi.firebasestorage.app",
  messagingSenderId: "968644599569",
  appId: "1:968644599569:web:313ad2870ce1c0fb6136b0"
};

// Initialize Firebase (only on the client)
let db: any = null;

if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export {db, collection, addDoc};