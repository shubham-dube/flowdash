
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN ;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID ;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET ;
const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ;
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID ;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
