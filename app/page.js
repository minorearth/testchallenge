"use client";
import { useEffect, useState } from "react";
import { TaskProps } from "./components/taskprops";
import {generator} from './tasks'

export default function Home() {
  const [taskProfile, setTaskProfile] = useState();
  const [tasksShown, setTasksShown] = useState();
  useEffect(() => {
    setTaskProfile(generator["taskEgeInf7type1"]);
  }, []);

  return (
    <>
      {taskProfile != undefined && (
        <TaskProps taskProfile={taskProfile} setTaskProfile={setTaskProfile} />
      )}
    </>
  );
}
