import React from "react";
import { Propinput } from "./rangeinput";
import { useState, useEffect } from "react";
import {MSelect} from './mselect'
import {

  updateDocFieldsInCollectionById,
} from "../../../../../../datamodel";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";



export const UnitsManager = ({
  item,
  propName,
  setRefreshTaskProfile,
  TaskId, collection
}) => {
  const [selectedValues, setSelectedValues] = useState(item.range);

  const updateRange = async () => {
    const path = `generator.props.${propName}.range`;
    const ob={ [path]: selectedValues };
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
        <MSelect values={item.values} selectedValues={selectedValues} setSelectedValues={setSelectedValues}/>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          disabled={false}
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
