import React from "react";
import { useState, useEffect } from "react";

const updateRange = (taskProfile, attName, value, propName) => {
  // console.log(value);
  if (attName == "range") {
    if (!Array.isArray(value)) {
      taskProfile.props[propName][attName] = value.split(",");
    }
    else{
      taskProfile.props[propName][attName] = value;
    }
  } else {
    taskProfile.props[propName][attName] = value;
  }
};

const generateRange = (start, end, step) => {
  let ret = [];
  for (let i = start; i <= end; i += step) {
    ret = [...ret, i];
  }
  return ret;
};

export const Propinput = ({
  refresh,
  propName,
  item,
  attName,
  taskProfile,
  setTaskProfile,
}) => {
  const [value, setValue] = useState("loading...");

  useEffect(() => {
    if (taskProfile.props[propName].type == "generator") {
      const a = generateRange(
        Number(item.start),
        Number(item.end),
        Number(item.step)
      );
      updateRange(taskProfile, "range", a, propName);
    }
    setValue(item[attName]);
    setTaskProfile(taskProfile);
  }, [refresh]);

  const changeHandler = (event) => {
    setValue(event.target.value);
    updateRange(taskProfile, attName, event.target.value, propName);
    setTaskProfile(taskProfile);
  };
  return (
    <div>
      <label>
        {attName}
        <input
          type="text"
          value={value}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          onChange={changeHandler}
        />
      </label>
    </div>
  );
};
