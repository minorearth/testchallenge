import React from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs,setDoc,doc,query, where,addDoc,deleteDoc,getFirestore } from "firebase/firestore";


const handleFileChange = async (e) => {
  // console.log();
  const fileUrl = URL.createObjectURL(e.target.files[0]);
  const response = await fetch(fileUrl);
  const text = await response.text();
  const lines = text
    .split("\n")
    .join("\r")
    .split("\r")
    .filter((item) => item != "");
  // const data = lines.map((line) => line.split(","));
  // console.log(data);
};

const firebaseConfig = {
  apiKey: "AIzaSyBwMnO7HaGuHu6LrzsTj6y6J9BojyC1ei0",
  authDomain: "testchallenge-52d1b.firebaseapp.com",
  projectId: "testchallenge-52d1b",
  storageBucket: "testchallenge-52d1b.appspot.com",
  messagingSenderId: "785621858975",
  appId: "1:785621858975:web:e1fcef81ff499466bd40aa",
  measurementId: "G-E08Z0JNFH2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

// Get a list of cities from your database
const getCities = async (db) => {
  const citiesCol = collection(db, "classes");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  citySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
  });
  return cityList;
};

const deleteAllDocsInCollection = async (collectionName) => {
  const citiesCol = collection(db, collectionName);
  const citySnapshot = await getDocs(citiesCol);
  // const cityList = citySnapshot.docs.map((doc) => doc.data());
  citySnapshot.forEach((item) => {
    // console.log(doc._document)
    deleteDoc(doc(db, collectionName, item.id));
  });
  // const citiesRef = collection(db, "cities");
};
const addDocInCollection = async (collectionName, value) => {
  const collectionRef = collection(db, collectionName);

  const q = query(collectionRef, where("class", "==", value));

  const querySnapshot = await getDocs(q);
  querySnapshot.docs.length == 0 &&
    (await addDoc(collectionRef, {
      classname: value,
      school: "1298",
      userid: "1",
    }));
};

export const Classes = () => {
  // deleteAllDocsInCollection('classes')
  // addDocInCollection('classes',"7Б")

  // sd();
  // doc(db, "cities");

  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};
