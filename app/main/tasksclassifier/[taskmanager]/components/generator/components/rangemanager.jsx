import React from "react";
import { Propinput } from "./rangeinput";
import { useState, useEffect, useRef } from "react";
import {
  updateDocFieldsInCollectionById,
} from "../../../../../../datamodel";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

export const RangeManager = ({ item, propName, setRefreshTaskProfile, TaskId, collection }) => {
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
    await updateDocFieldsInCollectionById(collection, TaskId, ob);
  };

  const saveStates = () => {
    updateRange().then(() => {
      setRefreshTaskProfile((state) => !state);
    });
  };

  return (
    <>
      <div className="flex flex-row">
        <Propinput attName="start" setRmState={setRmState} rmState={rmState}/>
        <Propinput attName="end" setRmState={setRmState} rmState={rmState} />
        <Propinput attName="step" setRmState={setRmState} rmState={rmState} />
  

        <Button

          key="btn"
          color="primary"
          startIcon={<RefreshOutlinedIcon />}
          onClick={() => {
            refreshRange();
          }}
        >
          Обновить
        </Button>

        <Propinput attName="range" setRmState={setRmState} rmState={rmState} />

        <Button key="btn2"
          color="primary"
          startIcon={<SaveOutlinedIcon />}
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
