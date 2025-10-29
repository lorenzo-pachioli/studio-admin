'use client';
import "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDataById, setData } from "./operations";
import { auth } from "./firebase";
import { IAdmin } from "@/types";
import { decrypt, verifySession } from "./statelessSession";

const provider = new GoogleAuthProvider();


const addAdminToFirestore = async (user: IAdmin) => {

  const session = await verifySession();
  if (!session.isAuth) {
    return null;
  }
  const cookie = await decrypt(session.cookie);
  if (!cookie || !cookie.uid) {
    return null;
  }

  const userExist = await getDataById("Admins", cookie.uid);
  if (!userExist) {
    await setData("Admins", cookie.uid, user);
  }
};

export const createAdmin = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      return error;
    });
}

export default async function logInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error;
  }
}

export const userAuth = async () => {

  try {
    const userCredentials = await signInWithPopup(auth, provider);

    const firebaseUser = userCredentials.user;
    const userToAdd: IAdmin = {
      displayName: firebaseUser.displayName || "",
      photoURL: firebaseUser.photoURL || "",
      addresses: [],
      email: firebaseUser.email || "",
      emailVerified: firebaseUser.emailVerified || false
    };

    addAdminToFirestore(userToAdd);
    return userCredentials.user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
};

export const loggedOut = async () => {
  signOut(auth);
};