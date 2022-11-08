// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf7bG3Rr6yYXwBckOOEQNA4vXBqWDWz2k",
  authDomain: "react-masterclass-4bfc4.firebaseapp.com",
  projectId: "react-masterclass-4bfc4",
  storageBucket: "react-masterclass-4bfc4.appspot.com",
  messagingSenderId: "270912741538",
  appId: "1:270912741538:web:e7a831e3d6c1a24b2737fb",
  measurementId: "G-8FB2J08ENH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
const auth = getAuth();

//email login
export const signupEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const analytics = getAnalytics(app);
