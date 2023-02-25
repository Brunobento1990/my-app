import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe-FPKr_fK2QNQSFiOuAzqrvbs2kEHQhc",
  authDomain: "appiscaslune.firebaseapp.com",
  projectId: "appiscaslune",
  storageBucket: "appiscaslune.appspot.com",
  messagingSenderId: "230989396733",
  appId: "1:230989396733:web:684517b9e01a3285e55c94",
  measurementId: "G-DNFZXRR3D7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);