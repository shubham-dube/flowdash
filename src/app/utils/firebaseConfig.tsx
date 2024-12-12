
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBarbW2-NK_f5Jd0sVWpgJ789A9wgLxBJ0",
  authDomain: "team-app-fad7f.firebaseapp.com",
  projectId: "team-app-fad7f",
  storageBucket: "team-app-fad7f.firebasestorage.app",
  messagingSenderId: "21411592776",
  appId: "1:21411592776:web:0108e0d9e894e72200b67d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
