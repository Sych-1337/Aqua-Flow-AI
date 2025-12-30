
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";

// NOTE: In a real app, these would be your actual Firebase project credentials
// For this environment, we use placeholders or assume pre-configuration.
const firebaseConfig = {
  apiKey: "AIzaSyAs-EXAMPLE-KEY",
  authDomain: "aquaflow-ai.firebaseapp.com",
  projectId: "aquaflow-ai",
  storageBucket: "aquaflow-ai.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
};

export const logout = () => signOut(auth);

// Firestore helpers
export const syncUserProfile = async (uid: string, profile: any) => {
  const userDoc = doc(db, "users", uid);
  await setDoc(userDoc, { profile }, { merge: true });
};

export const syncWaterLog = async (uid: string, log: any) => {
  const logDoc = doc(db, "users", uid, "logs", log.id);
  await setDoc(logDoc, log);
};

export const deleteWaterLog = async (uid: string, logId: string) => {
  // Simple implementation: for real app use deleteDoc from firebase/firestore
};
