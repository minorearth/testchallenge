import React from "react";
import { Propinput } from "./propinput";
import {useState, useEffect} from 'react'


export const RangeManager = ({item,propName,setTaskProfile,taskProfile,}) => {
  const [refresh,setRefresh]=useState(false)


  return (
    <>
    <div>{item.name}</div>
    <div className="flex flex-row">
      
      <Propinput refresh={refresh} item={item} propName={propName} attName="start" taskProfile={taskProfile} setTaskProfile={setTaskProfile}/>
      <Propinput refresh={refresh} item={item} propName={propName} attName="end" taskProfile={taskProfile} setTaskProfile={setTaskProfile} />
      <Propinput refresh={refresh} item={item} propName={propName} attName="step" taskProfile={taskProfile} setTaskProfile={setTaskProfile}/>
      <button
        onClick={() => {setRefresh(state=>!state)}}
        className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
      >
        Обновить
      </button>
      <Propinput refresh={refresh} propName={propName} item={item} attName="range" taskProfile={taskProfile} setTaskProfile={setTaskProfile} />
    </div>
    </>
  );
};
