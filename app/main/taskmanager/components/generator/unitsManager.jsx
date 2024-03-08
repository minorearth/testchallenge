import React from "react";
import { Propinput } from "./propinput";
import {useState, useEffect} from 'react'


export const UnitsManager = ({item,propName,setTaskProfile,taskProfile,}) => {
  const [refresh,setRefresh]=useState(false)


  return (
    <>
    <div>{item.name}</div>
    <div className="flex flex-row">
      <Propinput refresh={refresh} item={item} propName={propName} attName="range" taskProfile={taskProfile} setTaskProfile={setTaskProfile}/>
    </div>
    </>
  );
};
