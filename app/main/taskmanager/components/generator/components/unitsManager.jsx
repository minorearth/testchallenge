import React from "react";
import { Propinput } from "./propinput";
import { useState, useEffect } from "react";

export const UnitsManager = ({
  item,
  propName,
  setRefreshTaskProfile,
}) => {
  const [rmState,setRmState]=useState({"range": item["range"]})


  return (
    <>
      <div>{item.name}</div>
      <div className="flex flex-row">
        <Propinput
          attName="range"
          setRmState={setRmState}
          rmState={rmState}
        />
      </div>
    </>
  );
};
