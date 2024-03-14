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
  getDoc,
  updateDoc,
  writeBatch,
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

// export const getDataFromCollection = async (
//   collectionName,
//   setRows,
//   dependentFilter
// ) => {
//   console.log("sdsd", dependentFilter, dependentFilter.length);
//   if (dependentFilter.length == 0) {
//     setRows([]);
//     return;
//   }
//   const col = collection(db, collectionName);
//   let q;
//   if (dependentFilter != "none") {
//     const ids = dependentFilter.map((item) => item.id);
//     q = query(col, where("extid", "in", ids));
//   } else {
//     q = query(col);
//   }
//   const Snapshot = await getDocs(q);
//   let ret = [];
//   Snapshot.forEach((item) => {
//     {
//       const data = item.data();

//       ret = [...ret, { id: item.id, ...data }];
//     }
//   });
//   setRows(ret);
// };

export const getDataFromCollection = async (
  collectionName,
  dependentFilter
) => {
  if (dependentFilter.length == 0) {
    return [];
  }
  const col = collection(db, collectionName);
  let q;
  if (dependentFilter != "none") {
    const ids = dependentFilter.map((item) => item.id);
    q = query(col, where("extid", "in", ids));
  } else {
    q = query(col);
  }
  return await getDocs(q);
  
};

export const getDocFromCollectionById = async (collectionName, id) => {
  const docSnap = await getDoc(doc(db, collectionName, id));
  const data = docSnap.data();
  return { id: docSnap.id, ...data };
};

export const deleteAllDocsInCollection = async (collectionName) => {
  const citySnapshot = await getDocs(collection(db, collectionName));
  citySnapshot.forEach((item) => {
    deleteDoc(doc(db, collectionName, item.id));
  });
};

// export const deleteAllDocsInCollectionByIds = async (
//   collectionName,
//   ids
// ) => {

// sdfsdfds

// const batch = writeBatch(db);

//   const collectionRef = collection(db, collectionName);
//   const q = query(collectionRef, where(documentId(), "in", ids));

//   const Snapshot = await getDocs(q);
//   for (let i in Snapshot.docs) {
//     await deleteDoc(doc(db, collectionName, Snapshot.docs[i].id));
//   }
//   ;
// };

export const deleteAllDocsInCollectionByIds = async (collectionName, ids) => {
  const batch = writeBatch(db);
  ids.forEach((item) => {
    batch.delete(doc(db, collectionName, item));
  });
  await batch.commit()
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
  const check =
    checkduplic == true
      ? await checkIfExistByFieldValue(collectionName, key, value)
      : true;
  check && (await addDoc(collectionRef, data));
  setLoaded((state) => !state);
};

export const addDocInCollection = async (collectionName, data, setRows) => {
  return await addDoc(collection(db, collectionName), data);
  
};

export const updateMultipleDocInCollectionById = async (
  collectionName,
  ids,
  data
) => {
  ids.forEach((item) => {
    updateDoc(doc(db, collectionName, item.id), data);
  });
};
export const updateDocInCollectionById = async (collectionName, id, data) => {
  setDoc(doc(db, collectionName, id), data);
};

export const updateDocFieldsInCollectionById = async (
  collectionName,
  id,
  data
) => {
  await updateDoc(doc(db, collectionName, id), data);
};
