import React from "react";
import { RangeManager } from "./rangemanager";
import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { UnitsManager } from "./unitsManager";
import { generator } from "../tasks";
import { useTaskutils } from "../taskutils";
import { getDataFromCollection } from "../../../datamodel";

function combineArrays(array_of_arrays) {
  let odometer = new Array(array_of_arrays.length);
  odometer.fill(0);
  let output = [];
  let newCombination = formCombination(odometer, array_of_arrays);
  output.push(newCombination);
  while (odometer_increment(odometer, array_of_arrays)) {
    newCombination = formCombination(odometer, array_of_arrays);
    output.push(newCombination);
  }
  for (let k in output) {
    output[k]["id"] = Number(k) + 1;
  }
  return output;
}

function formCombination(odometer, array_of_arrays) {
  return odometer.reduce(function (
    accumulator,
    odometer_value,
    odometer_index
  ) {
    let b = "prop" + odometer_index;
    accumulator[b] = array_of_arrays[odometer_index][odometer_value];
    return accumulator;
  },
  {});
}

function odometer_increment(odometer, array_of_arrays) {
  for (
    let i_odometer_digit = odometer.length - 1;
    i_odometer_digit >= 0;
    i_odometer_digit--
  ) {
    let maxee = array_of_arrays[i_odometer_digit].length - 1;
    if (odometer[i_odometer_digit] + 1 <= maxee) {
      odometer[i_odometer_digit]++;
      return true;
    } else {
      if (i_odometer_digit - 1 < 0) {
        return false;
      } else {
        odometer[i_odometer_digit] = 0;
        continue;
      }
    }
  }
}

const collectArrays = (props) => {
  // return [[1,2,3],[4,5,6],[4,5,6]]
  return Object.keys(props)
    .filter((item) => props[item].range != "undefined" && props[item].range)
    .map((item) => [...props[item].range]);
};

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

const extractPropNames = (props) => {
  return Object.keys(props);
};

const makeInput = (row, props, propNames, utils) => {

  let a = {};
  propNames.forEach((item) => (a[props[item].name] = row[item]));
  a = { ...a, utils: utils };
  
  return a;
};

const fulfillWithAnswers = (pop, props, propNames, utils, taskFunction) => {
  return pop.map((item) => {
    return {
      ...item,
      answer: taskFunction.call( null, makeInput(item, props, propNames, utils)),
    };
    // return { ...item, answer: f(makeInput(item, props, propNames, utils)) };
  });
};


export const TaskProps = () => {
  const [rows, setRows] = useState([]);
  const [columns, setCols] = useState([]);
  const utils = useTaskutils();
  const [taskProfile, setTaskProfile] = useState();
  const [taskFunction, setTaskFunction] = useState();
  const [taskProfileDB, setTaskProfileDB] = useState([]);
  const [tasksShown, setTasksShown] = useState();
  
  useEffect(() => {
    getDataFromCollection("tasks2", setTaskProfileDB, "none");
  }, []);

  useEffect(() => {
    if (taskProfileDB.length != 0) {
      setTaskProfile(JSON.parse(taskProfileDB[0].generator));
      let func = new Function("{ return " + taskProfileDB[0].function + " }");
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
      {Object.keys(taskProfile.props).map(
        (item) =>
          taskProfile.props[item].type == "generator" && (
            <RangeManager
              item={taskProfile.props[item]}
              propName={item}
              taskProfile={taskProfile}
              setTaskProfile={setTaskProfile}
            />
          )
      )}
      {Object.keys(taskProfile.props).map(
        (item) =>
          taskProfile.props[item].type == "picklist" && (
            <UnitsManager
              item={taskProfile.props[item]}
              propName={item}
              taskProfile={taskProfile}
              setTaskProfile={setTaskProfile}
            />
          )
      )}
      <button
        onClick={() => {
          let pop = combineArrays(collectArrays(taskProfile.props));
          pop = fulfillWithAnswers(
            pop,
            taskProfile.props,
            extractPropNames(taskProfile.props),
            utils,
            taskFunction
          );
          setCols(makeGridHeader(taskProfile));

          setRows(pop);
        }}
        className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
      >
        Сгенерировать и проверить задачи
      </button>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};
