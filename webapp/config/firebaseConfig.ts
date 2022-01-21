import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  initializeFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();

export const db = getFirestore(app);
// export const db = initializeFirestore(app, {useFetchStreams:false} as any)

