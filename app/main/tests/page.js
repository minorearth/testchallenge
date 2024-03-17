"use client"
import React from "react";
import { Datagrid } from "../components/datagrid/datagrid";
import { useState } from "react";
export default function Tests() {

const [testsFilters, setTestsFilters] = useState([]);

  const testscolumns = [
    { field: "id", headerName: "id", width: 270 },
    {
      field: "testname",
      headerName: "Название",
      editable: true,
      width: 130,
    },
    { field: "tasks", headerName: "Задачи", editable: true, width: 130 },
    // { field: "keyfield", headerName: "keyfield", editable: true, width: 130 },
    // { field: "extid", headerName: "extid", editable: true, width: 130 },
  ];

  return (
    <Datagrid
      collection="tests"
      keyfield="none"
      columns={testscolumns}
      checkduplic={false}
      dependentFilter="none"
      showhidetool={{
        delete: false,
        copy: "none",
        edittask: "none",
        edittest: true,
        csvload: false,
        add: false,
        move: "none",
      }}
      setFilters={setTestsFilters}
      actions="none"
    />
  );
}
