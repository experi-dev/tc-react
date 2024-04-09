import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const adminConfig = {
  apiKey: "AIzaSyAwuYlCSMhgEc_Zlj8ZbkosYMR2SFteX1E",
  authDomain: "trading-circle-ph-admin.firebaseapp.com",
  databaseURL: "https://trading-circle-ph-admin-default-rtdb.firebaseio.com",
  projectId: "trading-circle-ph-admin",
  storageBucket: "trading-circle-ph-admin.appspot.com",
  messagingSenderId: "902115128441",
  appId: "1:902115128441:web:8a64161362776141e690a8"
};

const app = initializeApp(adminConfig,'Admin Configuration');

export const adminDB = getDatabase(app);
export const adminStroage = getStorage(app);
