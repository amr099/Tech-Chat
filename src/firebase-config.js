import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCgsxx9B8hK2EW6DUGj4uA6qB7OwXlU0oc",
    authDomain: "react-chat-app-b5d76.firebaseapp.com",
    projectId: "react-chat-app-b5d76",
    storageBucket: "react-chat-app-b5d76.appspot.com",
    messagingSenderId: "440360445092",
    appId: "1:440360445092:web:f5830ea0f56880413b3231",
    measurementId: "G-BTE6LD0CFP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
