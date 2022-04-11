import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseResponse } from "/type";

const firebaseConfig = {
  apiKey: "AIzaSyCavPBkH9wuFdZrpyT3tgSDJ7J82AAy_P0",
  authDomain: "multimovie-ca626.firebaseapp.com",
  projectId: "multimovie-ca626",
  storageBucket: "multimovie-ca626.appspot.com",
  messagingSenderId: "513035858222",
  appId: "1:513035858222:web:41f5223c94e83e0724cabf",
};

export const app = initializeApp(firebaseConfig);

export const loginAuth = () =>
  new Promise<firebaseResponse>((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential == null) {
        } else {
          const token = credential.accessToken;
          const user = result.user;

          resolve(result.user as unknown as firebaseResponse);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

export const listenAuthState = () =>
  new Promise<string>((resolve, reject) => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.getIdToken(true));
      }
    });
  });

export const user = () => {
  return getAuth().currentUser;
};

export const userToken = async () => {
  return await getAuth().currentUser?.getIdToken();
};
