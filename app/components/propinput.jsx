import React from "react";
import {useState,useEffect} from 'react'

const updateRange = (taskProfile, attName, value,propName)=>{
  taskProfile.props.filter(item=>item.name==propName)[0][attName]=value

  // console.log('zu',a,propName)
  // taskProfile.props=[...taskProfile.props.filter(item=>item.name!=propName),...a]
  // return taskProfile
}

const generateRange = (start, end, step) => {
  let ret = [];
  for (let i = start; i <= end; i += step) {
    ret = [...ret, i];
  }
  return ret;
};

export const Propinput = ({ refresh, item, attName, taskProfile,setTaskProfile }) => {


  console.log(item)
  const [value, setValue]=useState('loading...')

  useEffect(()=>{
    
    // console.log('renderrefresh')
    console.log(item[attName],attName,item)

    let a=generateRange(Number(item.start), Number(item.end), Number(item.step))
    // attName=='range'?setValue(a): setValue(item[attName])
    setValue(item[attName])
    updateRange(taskProfile,'range',a,item.name)
    setTaskProfile(taskProfile)
  },[refresh])


  const changeHandler = (event)=>{
    // console.log('render2')
    setValue(event.target.value)
    updateRange(taskProfile,attName,event.target.value,item.name)
    setTaskProfile(taskProfile)
  }
  return (
    <div>
        <label>
          {attName}
          <input
            type="text"
            // placeholder={item.title}
            value={value}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            onChange={changeHandler}
          />
        </label>
    </div>
  );
};
