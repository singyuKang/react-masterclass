// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import { stringify } from "querystring";
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
const auth = getAuth(app);

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
  // auth.onAuthStateChanged((user: any) => {
  //   console.log(
  //     "🚀 ~ file: fBase.ts ~ line 53 ~ auth.onAuthStateChanged ~ user",
  //     user
  //   );
  //   if (user.user.emailVerified) {
  //     console.log("email verification");
  //   } else {
  //     console.log("bug");
  //   }
  // });
  if (emailVerified === true) {
    console.log("emailVerifired true");
    return signInWithEmailAndPassword(auth, email, password);
  } else if (emailVerified === undefined) {
    console.log("Logout and login");
    return signInWithEmailAndPassword(auth, email, password);
  } else {
    throw "auth/emailVerified";
  }

  // return signInWithEmailAndPassword(auth, email, password);
};

//Email Send
export const sendEmail = () => {
  sendEmailVerification(auth.currentUser as any).then(() => {
    //Email verification Sent
  });
};

//Email reauthentication
export const reAuthentication = async (email: string, password: string) => {
  // auth.currentUser.
  const currentUser = auth.currentUser;
  const credential = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(currentUser as User, credential);
};
//Login Check
export const checkLogin = () => {
  // app.auth().onA
  auth.onAuthStateChanged((user) => {
    console.log(user);
  });
};

//Logout

export const logOut = () => {
  auth.signOut().then(() => {
    try {
      //Signout successful
      localStorage.removeItem("token");
      console.log(
        "🚀 ~ file: fBase.ts ~ line 84 ~ auth.signOut SignoutComplete"
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: fBase.ts ~ line 84 ~ auth.signOut ~ error",
        error
      );
      //Signout Error
    }
  });
};
// utils/token.tsx - 로컬 스토리지에 토큰 저장
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// utils/token.tsx - 토큰의 만료 여부를 확인하고, 기존의/갱신된 토큰을 로컬스토리지에 저장 후 전달
export function getToken() {
  const auth = getAuth();
  auth.onIdTokenChanged(function (user) {
    if (user) {
      user.getIdToken().then((token) => {
        console.log("my token : ", token);
        setToken(token);
      });
    }
  });
  const token = localStorage.getItem("token") ?? "";
  return token;
}

// export const sendEmail = (email:string, ) =>{
//   return sendSignInLinkToEmail(auth, email, actionCodeSettings)
// }

const analytics = getAnalytics(app);
