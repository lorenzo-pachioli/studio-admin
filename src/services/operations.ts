import { IAdmin } from "@/types";
import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, setDoc, CollectionReference, DocumentData, deleteDoc } from 'firebase/firestore/lite';
import { userModeler } from "@/lib/utils";


export async function getAdminColection(coll: string): Promise<any[]> {
  const users = collection(db, coll);
  const usersList = await getDocs(users);
  const data = usersList.docs.map(doc => {
    return userModeler(doc.data());
  });
  return data;
}

export const getNullAdmin = (): IAdmin => {
  return userModeler();
}

export async function setData(coll: string, id: string, data: any) {
  const docRef = await setDoc(doc(db, coll, id), data);
  return docRef;
}

export async function removeData(coll: string, id: string) {
  const docRef = await deleteDoc(doc(db, coll, id));
  return docRef;
}

export async function getDataById(coll: string, id: string) {
  const docSnap = await getDoc(doc(db, coll, id));
  const data = docSnap.data();
  return data;
}

export async function getCollectionRef(coll: string): Promise<CollectionReference<DocumentData>> {
  const docRef = collection(db, coll);
  return docRef;
}

export async function getCollections<T = any>(coll: string): Promise<T[]> {

  const docRef = collection(db, coll);
  const docList = await getDocs(docRef);
  return docList.docs.map(doc => ({ ...doc.data() } as T));
}

export async function getAdminById(id: string): Promise<IAdmin> {
  const docSnap = await getDoc(doc(db, "Admins", id));
  const data = docSnap.data();
  if (data) {
    return userModeler(data);
  } else {
    return getNullAdmin();
  }
}
