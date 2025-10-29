import { ICartItem, IOrders, IAdmin } from "@/types";
import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, setDoc, CollectionReference, DocumentData } from 'firebase/firestore/lite';
import { verifySession, decrypt } from "./statelessSession";


export async function getAdminColection(coll: string): Promise<any[]> {
  const users = collection(db, coll);
  const usersList = await getDocs(users);
  const data = usersList.docs.map(doc => {
    return {
      name: doc.data().name,
      uid: doc.data().uid,
      username: doc.data().username,
      color: doc.data().color,
      photo: doc.data().photo
    }
  });
  return data;
}

export const getNullAdmin = (): IAdmin => {
  const newUser: IAdmin = {
    displayName: "",
    photoURL: "",
    addresses: [],
    email: "",
    emailVerified: false
  };
  return newUser;
}

export async function setData(coll: string, id: string, data: any) {
  console.log("Instancia de db:", db);
  const docRef = await setDoc(doc(db, coll, id), data);
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

export async function getCollections(coll: string): Promise<any[]> {

  const docRef = collection(db, coll);
  const docList = await getDocs(docRef);
  return docList.docs.map(doc => ({ ...doc.data() }));
}

export async function getAdminById(id: string): Promise<IAdmin> {
  const docSnap = await getDoc(doc(db, "Admins", id));
  const data = docSnap.data();
  if (data) {
    const newUser = {
      displayName: data.displayName, // Use provided name if available
      photoURL: data.photoURL || "",
      email: data.email,
      emailVerified: data.emailVerified || false,
      addresses: data.addresses || []
    };
    return newUser;
  } else {
    return getNullAdmin();
  }
}
