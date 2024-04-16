// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ1Ig_EJnIH4vo2PBCAUsWhqVPF17gSmM",
  authDomain: "hina-siddique.firebaseapp.com",
  projectId: "hina-siddique",
  storageBucket: "hina-siddique.appspot.com",
  messagingSenderId: "710652149785",
  appId: "1:710652149785:web:20f4138eabc46219ff6a88",
  measurementId: "G-JEKQLJXPB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)