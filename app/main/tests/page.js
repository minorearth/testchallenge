"use client";
import React, { useEffect } from "react";
import { Datagrid } from "../components/datagrid/datagrid";
import { useState } from "react";
// import { getDocFromCollectionById } from "../../datamodel";
import { getDocFromCollectionById } from "../../datamodelSSR";
import {
  neverRepeat,
  randomVal,
} from "../tasksclassifier/components/tree/treeutils";

export default function Tests() {
  const [testsFilters, setTestsFilters] = useState([]);

  // const pickRandomTasks = (allNum, taskIds) => {
  //   if (allNum < taskIds.length) {
  //     const zu = neverRepeat(taskIds.length, allNum);
  //     return zu.map((dd) => taskIds[dd]);
  //   } else {
  //     return taskIds;
  //   }
  // };

  // const pickVariantsFromTasks = (tasksAllocatedIds, tasks) => {
  //   console.log(
  //     tasksAllocatedIds.map((id) => {
  //       const variants = tasks.filter((task) => task.id == id)[0].variants;
  //       const rnd = randomVal(variants.length);
  //       return variants[rnd];
  //     })
  //   );
  // };

  // const extractTaskAllocatedIds = (tasksToFolderNum,tasks) => {
  //   return Object.keys(tasksToFolderNum)
  //     .map((fldId) => {
  //       return pickRandomTasks(
  //         tasksToFolderNum[fldId],
  //         tasks.filter((task) => task.extid == fldId).map((task) => task.id)
  //       );
  //     })
  //     .flat();
  // };

  // getDocFromCollectionById("tests", "5p9qERAOgy2AwMXQfbkN").then((res) => {
  //   const tasks = res.content[0].tasks;
  //   const tasksToFolderNum = res.content[0].allocation;
  //   const tasksAllocatedIds = extractTaskAllocatedIds(tasksToFolderNum,tasks);
  //   pickVariantsFromTasks(tasksAllocatedIds, tasks);
  // });
  useEffect(() => {
    getDocFromCollectionById("tests", "5p9qERAOgy2AwMXQfbkN").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      {/* <Datagrid
        collection="tests"
        mode="simple"
        keyfield="none"
        checkduplic={false}
        dependentFilter="none"
        setFilters={setTestsFilters}
        actions="none"
      /> */}
    </div>
  );
}
