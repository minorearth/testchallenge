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

import { initializeApp } from "firebase/app";

export const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export const getDataFromCollection = async (
  collectionName,
  setRows,
  dependentFilter
) => {

  if (dependentFilter.length==0){
    setRows([])
    return 
  }
  const col = collection(db, collectionName);
  let q
  if (dependentFilter != "none") {
    const ids=dependentFilter.map(item=>item.id)
    q = query(col, where('extid', "in", ids))
  } else {
    q = query(col);  
  }
  const Snapshot = await getDocs(q);
  let ret = [];
  Snapshot.forEach((item) => {
    {
      const data = item.data();
      ret = [...ret, { id: item.id, ...data }];
    }
  });
  setRows(ret);
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

const checkIfExistByFieldValue = async (collectionName, key, value) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(key, "==", value));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length == 0;
};

export const addDocInCollectionByValue = async (
  collectionName,
  key,
  value,
  data,
  setLoaded,
  checkduplic
) => {
  const collectionRef = collection(db, collectionName);
  const check=checkduplic==true?await checkIfExistByFieldValue(collectionName, key, value):true
  check && (await addDoc(collectionRef, data));
  setLoaded((state) => !state);
};

export const addDocInCollection = async (collectionName, data, setRows) => {
  const collectionRef = collection(db, collectionName);
  const doc = await addDoc(collectionRef, data);
  setRows((oldRows) => [{ id: doc.id, ...data }, ...oldRows]);
};

export const updateDocInCollectionById = async (collectionName, id, data) => {
  setDoc(doc(db, collectionName, id), data);
};
