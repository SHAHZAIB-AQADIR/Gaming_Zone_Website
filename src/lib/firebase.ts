import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPhwBurWeGJMg1dhbxExobn0WsAZYk9Fc",
  authDomain: "gaming-zone-c18fa.firebaseapp.com",
  projectId: "gaming-zone-c18fa",
  storageBucket: "gaming-zone-c18fa.appspot.com", // ✅ FIXED
  messagingSenderId: "692779372086",
  appId: "1:692779372086:web:198f44156c458e9402d297"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
