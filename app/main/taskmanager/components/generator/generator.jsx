import React from "react";
import { RangeManager } from "./components/rangemanager";
import { UnitsManager } from "./components/unitsManager";
import { useGenerator } from "./ViewModel";
import Divider from '@mui/material/Divider';

export const Generator = ({
  taskProfile,
  setTaskProfile,
  taskFunction,
  TaskId,
  collection,
  setRefreshVariants,
  setRefreshTaskProfile
}) => {
  const [produceVariants] = useGenerator(
    taskProfile,
    taskFunction,
    TaskId,
    collection,
    setRefreshVariants
  );

  return (
    <>
      {taskProfile.order.map(
        (item) =>
          taskProfile.props[item].type == "generator" && (
            <>
            <Divider textAlign="left" sx={{my:2}}>{taskProfile.props[item].name}</Divider>
            <RangeManager
              item={taskProfile.props[item]}
              propName={item}
              setRefreshTaskProfile={setRefreshTaskProfile}
            />
            </>
          )
      )}
      {taskProfile.order.map(
        (item) =>
          taskProfile.props[item].type == "picklist" && (
            <UnitsManager
              item={taskProfile.props[item]}
              propName={item}
              setRefreshTaskProfile={setRefreshTaskProfile}
            />
          )
      )}
      <button
        onClick={() => produceVariants()}
        className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
      >
        Сгенерировать и проверить задачи
      </button>
    </>
  );
};
