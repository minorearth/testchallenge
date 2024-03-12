import React from "react";
import { Propinput } from "./rangeinput";
import { useState, useEffect, useRef } from "react";
import {
  addDocInCollectionByValue,
  deleteAllDocsInCollectionByIds,
  getDataFromCollection,
  updateDocInCollectionById,
  addDocInCollection,
  updateDocFieldsInCollectionById,
} from "../../../../../datamodel";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const RangeManager = ({ item, propName, setRefreshTaskProfile }) => {
  const generateRange = (start, end, step) => {
    let ret = [];
    for (let i = Number(start); i <= Number(end); i += Number(step)) {
      ret = [...ret, i];
    }
    return ret;
  };

  const refreshRange = () => {
    setRmState((state) => ({
      ...state,
      range: generateRange(state["start"], state["end"], state["step"]),
    }));
  };

  const [rmState, setRmState] = useState({
    start: item["start"],
    end: item["end"],
    step: item["step"],
    range: item["range"],
  });

  const updateRange = async () => {
    const ob = Object.keys(rmState).reduce((acc, item) => {
      let parsedValue = rmState[item];
      if (item == "range" && !Array.isArray(rmState[item])) {
        parsedValue = rmState[item].split(",");
      }
      const path = `generator.props.${propName}.${item}`;
      return { ...acc, [path]: parsedValue };
    }, {});
    await updateDocFieldsInCollectionById("tasks2", "taskEgeInf7type1", ob);
  };

  const saveStates = () => {
    updateRange().then(() => {
      setRefreshTaskProfile((state) => !state);
    });
  };

  return (
    <>
      <div className="flex flex-row">
        <Propinput attName="start" setRmState={setRmState} rmState={rmState} />
        <Propinput attName="end" setRmState={setRmState} rmState={rmState} />
        <Propinput attName="step" setRmState={setRmState} rmState={rmState} />
  

        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            refreshRange();
          }}
        >
          Обновить
        </Button>

        <Propinput attName="range" setRmState={setRmState} rmState={rmState} />

        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            saveStates();
          }}
        >
          Сохранить
        </Button>
      </div>
    </>
  );
};
