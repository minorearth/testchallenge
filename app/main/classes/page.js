"use client";
import React from "react";
import { Button } from "@mui/material";
import { Datagrid } from "./datagrid";
import { useEffect, useState, useRef } from "react";


export default function Classes() {

  const [classFilters, setClassFilters]=useState([])
  const classcolumns = [
    { field: "id", headerName: "id", width: 270 },
    { field: "classname", headerName: "Мои классы", editable: true, width: 130 },
    { field: "school", headerName: "Школа", editable: true, width: 130 },
    { field: "keyfield", headerName: "keyfield", editable: true, width: 130 },
    { field: "extid", headerName: "extid", editable: true, width: 130 },
  ];
  const userscolumns = [
    { field: "id", headerName: "id", width: 270 },
    { field: "username", headerName: "ФИО", editable: true, width: 330 },
    { field: "login", headerName: "Логин", editable: true, width: 130 },
    { field: "psw", headerName: "Пароль", editable: true, width: 130 },
    { field: "keyfield", headerName: "keyfield", editable: true, width: 130 },
    { field: "extid", headerName: "extid", editable: true, width: 130 },
  ];
  return (
    <div className="flex flex-row h-full p-4">
      <div className="flex-1">
      <Datagrid collection = "classes" keyfield="classname" columns={classcolumns} checkduplic={true} dependentFilter="none" setFilters={setClassFilters}/>
      </div>
      <div className="flex-1 ">
      <Datagrid collection = "myusers" keyfield="username" columns={userscolumns} checkduplic={false} dependentFilter={classFilters} setFilters={()=>{}}/>
      </div>
    </div>
  );
}
