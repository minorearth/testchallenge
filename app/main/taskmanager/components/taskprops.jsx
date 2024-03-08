import React from "react";
import { useEffect, useState } from "react";
import { DataGrid} from "@mui/x-data-grid";
import {Generator} from "./generator/generator"
import {
  getDocFromCollectionById,
} from "../../../datamodel";





export const TaskProps = () => {
  const [rows, setRows] = useState([]);
  const [columns, setCols] = useState([]);
  const [taskProfile, setTaskProfile] = useState();
  const [taskFunction, setTaskFunction] = useState();
  const [taskProfileDB, setTaskProfileDB] = useState([]);
  const [tasksShown, setTasksShown] = useState();

  useEffect(() => {
    getDocFromCollectionById("tasks2", setTaskProfileDB, "taskEgeInf7type1");
  }, []);

  useEffect(() => {
    if (taskProfileDB.length != 0) {
      setTaskProfile(JSON.parse(taskProfileDB.generator));
      let func = new Function("{ return " + taskProfileDB.function + " }");
      setTaskFunction(func);
    }
  }, [taskProfileDB]);

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
        defaultValue={taskProfileDB != undefined && taskProfile.task}
      />
      <Generator setCols={setCols} setRows={setRows} taskProfile={taskProfile} setTaskProfile={setTaskProfile} taskFunction={taskFunction}/>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};
