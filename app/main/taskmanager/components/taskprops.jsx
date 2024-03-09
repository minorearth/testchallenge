import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Generator } from "./generator/generator";
import { getDocFromCollectionById } from "../../../datamodel";
import { TaskVariants } from "../components/taskvariants/taskvariants";
import { Button } from "@mui/material";
import { updateTasks } from "../tasks";

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

export const TaskProps = ({ collection }) => {
  const [rows, setRows] = useState([]);
  const [columns, setCols] = useState([]);
  const [taskProfile, setTaskProfile] = useState();
  const [taskFunction, setTaskFunction] = useState();
  const [refreshVariants, setRefreshVariants] = useState(true);
  const [refreshTaskProfile, setRefreshTaskProfile] = useState(true);
  const TaskId = "taskEgeInf7type1";

  useEffect(() => {
    // updateTasks();
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
      <div style={{ height: 300, width: "100%" }}>
        <TaskVariants
          rows={rows}
          columns={columns}
          collection="tasks2"
          keyfield="none"
          checkduplic={false}
          dependentFilter="none"
          setFilters={() => {}}
        />
      </div>
    </>
  );
};
