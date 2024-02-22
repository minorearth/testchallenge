import React from "react";
import { Propinput } from "./propinput";
import {useState, useEffect} from 'react'


export const RangeManager = ({item,setTaskProfile,taskProfile}) => {
  const [refresh,setRefresh]=useState(false)
  // console.log(item)

  return (
    <>
    <div>{item.name}</div>
    <div className="flex flex-row">
      
      <Propinput refresh={refresh} item={item} propname={item.name} attName="start" taskProfile={taskProfile} setTaskProfile={setTaskProfile}/>
      <Propinput refresh={refresh} item={item} propname={item.name} attName="end" taskProfile={taskProfile} setTaskProfile={setTaskProfile} />
      <Propinput refresh={refresh} item={item} propname={item.name} attName="step" taskProfile={taskProfile} setTaskProfile={setTaskProfile}/>
      <button
        onClick={() => {setRefresh(state=>!state)}}
        className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
      >
        Обновить
      </button>
      <Propinput refresh={refresh} propname={item.name} item={item} attName="range" taskProfile={taskProfile} setTaskProfile={setTaskProfile} />
    </div>
    </>
  );
};
