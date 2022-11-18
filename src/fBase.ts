// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
const auth = getAuth();

//email 회원가입
export const signupEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await sendEmailVerification(userCredential.user);
  return userCredential;
  // return createUserWithEmailAndPassword(auth, email, password);
};

//Email 로그인
export const loginEmail = async (email: string, password: string) => {
  const emailVerified = auth.currentUser?.emailVerified;
  console.log(
    "🚀 ~ file: fBase.ts ~ line 47 ~ loginEmail ~ emailVerified",
    emailVerified
  );
  if (emailVerified === true) {
    return signInWithEmailAndPassword(auth, email, password);
  } else {
    throw "auth/emailVerified";
  }

  // return signInWithEmailAndPassword(auth, email, password);
};

export const sendEmail = () => {
  sendEmailVerification(auth.currentUser as any).then(() => {
    //Email verification Sent
  });
};

export const getToken = () => {
  // Firebase
};

// export const sendEmail = (email:string, ) =>{
//   return sendSignInLinkToEmail(auth, email, actionCodeSettings)
// }

const analytics = getAnalytics(app);
