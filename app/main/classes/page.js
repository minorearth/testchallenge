"use client";
import React from "react";
import { Button } from "@mui/material";
import { Datagrid } from "../components/datagrid/datagrid";
import { useEffect, useState, useRef } from "react";

export default function Classes() {
  const [classFilters, setClassFilters] = useState([]);

  return (
    <div className="flex flex-row h-full p-4">
      <div className="flex-1">
        <Datagrid
          collection="classes"
          mode='simple'
          keyfield="classname"
          checkduplic={true}
          dependentFilter="none"
          setFilters={setClassFilters}
          actions="none"
        />
      </div>
      <div className="flex-1 ">
        <Datagrid
          collection="myusers"
          mode='simple'
          keyfield="username"
          checkduplic={false}
          dependentFilter={classFilters}
          setFilters={() => {}}
          actions="none"
        />
      </div>
    </div>
  );
}
