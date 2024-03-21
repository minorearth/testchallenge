"use client";
import React from "react";
import { Datagrid } from "../components/datagrid/datagrid";
import { useState } from "react";
export default function Tests() {
  const [testsFilters, setTestsFilters] = useState([]);

  
  const [openPickTasksModal, setOpenPickTasksModal] = useState(false);
  return (
    <div>
      <Datagrid
        collection="tests"
        mode='simple'
        keyfield="none"
        checkduplic={false}
        dependentFilter="none"
        setFilters={setTestsFilters}
        actions="none"
      />
    </div>
  );
}
