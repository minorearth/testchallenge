import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  addDoc,
  deleteDoc,
  getFirestore,
  documentId,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwMnO7HaGuHu6LrzsTj6y6J9BojyC1ei0",
  authDomain: "testchallenge-52d1b.firebaseapp.com",
  projectId: "testchallenge-52d1b",
  storageBucket: "testchallenge-52d1b.appspot.com",
  messagingSenderId: "785621858975",
  appId: "1:785621858975:web:e1fcef81ff499466bd40aa",
  measurementId: "G-E08Z0JNFH2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getDataFromCollection = async (collectionName, setRows, buildRows) => {
  const col = collection(db, collectionName);
  const Snapshot = await getDocs(col);
  setRows(buildRows(Snapshot));
};

export const deleteAllDocsInCollection = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const citySnapshot = await getDocs(collectionRef);
  citySnapshot.forEach((item) => {
    deleteDoc(doc(db, collectionName, item.id));
  });
};
export const deleteAllDocsInCollectionByIds = async (
  collectionName,
  ids,
  setLoaded
) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(documentId(), "in", ids));

  const Snapshot = await getDocs(q);
  for (let i in Snapshot.docs) {
    await deleteDoc(doc(db, collectionName, Snapshot.docs[i].id));
  }
  setLoaded((state) => !state);
};

export const addDocInCollectionByValue = async (
  collectionName,
  key,
  value,
  data,
  setLoaded
) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(key, "==", value));
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.length == 0 && (await addDoc(collectionRef, data));
  setLoaded((state) => !state);
};

export const addDocInCollection = async (
  collectionName,
  field,
  value,
  setRows
) => {
  const collectionRef = collection(db, collectionName);
  const doc = await addDoc(collectionRef, { [field]: value });
  setRows((oldRows) => [{ id: doc.id, [field]: value }, ...oldRows]);
};

export const updateDocInCollectionById = async (collectionName, id, data) => {
  setDoc(doc(db, collectionName, id), data);
};
