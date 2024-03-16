import React from "react";
import { useEffect, useState } from "react";
import { Generator } from "./generator/generator";
import { getDocFromCollectionById } from "../../../../datamodel";
import { updateTasks } from "../../../tasks";
import {Datagrid} from "../../../../main/components/datagrid/datagrid"

const makeGridHeader = (taskProfile) => {
  let cols = Object.keys(taskProfile.props)
    // .filter((item) => taskProfile.props[item].type == "generator")
    .map((item, id) => {
      return {
        field: item,
        headerName: taskProfile.props[item].title,
        width: 150,
      };
    });
  return [...cols, { field: "answer", headerName: "Ответ", width: 150 }];
};

export const TaskProps = ({ collection,TaskId }) => {
  const [rows, setRows] = useState([]);
  const [columns, setCols] = useState([]);
  const [taskProfile, setTaskProfile] = useState();
  const [taskFunction, setTaskFunction] = useState();
  const [refreshVariants, setRefreshVariants] = useState(true);
  const [refreshTaskProfile, setRefreshTaskProfile] = useState(true);
  

  useEffect(() => {
    updateTasks();
    getDocFromCollectionById(collection, TaskId).then((res) => {
      if (res.length != 0) {
        setTaskProfile(res.generator);
        let func = new Function("{ return " + res.function + " }");
        setTaskFunction(func);
        setCols(makeGridHeader(res.generator));
        res.variants != undefined && setRows(res.variants);
      }
    });
  }, []);

  useEffect(() => {
    getDocFromCollectionById(collection, TaskId).then((res) => {
      if (res.length != 0) {
        setTaskProfile(res.generator);
      }
    });
  }, [refreshTaskProfile]);


  useEffect(() => {
    getDocFromCollectionById(collection, TaskId).then((res) => {
      if (res.length != 0) {
        res.variants != undefined && setRows(res.variants);
      }
    });
  }, [refreshVariants]);


  if (taskProfile == undefined) {
    return <p>Loading</p>;
  }
  return (
    <>
      <textarea
        className="w-full h-60"
        name="postContent"
        rows={4}
        cols={40}
        defaultValue={taskProfile != undefined && taskProfile.task}
      />
      <Generator
        TaskId={TaskId}
        taskProfile={taskProfile}
        setTaskProfile={setTaskProfile}
        taskFunction={taskFunction}
        collection={collection}
        setRefreshVariants={setRefreshVariants}
        setRefreshTaskProfile={setRefreshTaskProfile}
        
      />
      <div style={{ width: "100%" }}>
 
        <Datagrid
          columns={columns}
          collection={collection}
          keyfield="none"
          checkduplic={false}
          dependentFilter={[{'id':TaskId}]}
          setFilters={() => {}}
          mode='dataInObject'
          showhidetool={{
            delete: true,
            copy: "none",
            edittask: "none",
            csvload: false,
            add: false,
            move:"none"
          }}
          actions={{ action1: ()=>{}, action1: ()=>{} }}
        />
      </div>
    </>
  );
};
