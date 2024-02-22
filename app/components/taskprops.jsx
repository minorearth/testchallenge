import React from "react";
import { RangeManager } from "./rangemanager";

function combineArrays(array_of_arrays) {
  // console.log(array_of_arrays);
  let odometer = new Array(array_of_arrays.length);
  odometer.fill(0);
  let output = [];
  let newCombination = formCombination(odometer, array_of_arrays);
  output.push(newCombination);
  while (odometer_increment(odometer, array_of_arrays)) {
    newCombination = formCombination(odometer, array_of_arrays);
    output.push(newCombination);
  }
  for (let k in output){
    output[k]['id']=Number(k)+1
  }
  return output;
}

function formCombination(odometer, array_of_arrays) {
  return odometer.reduce(function (
    accumulator,
    odometer_value,
    odometer_index
  ) {
    let b="col"+odometer_index
    accumulator[b]=array_of_arrays[odometer_index][odometer_value]
    return accumulator;  },
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
  return props
    .filter((item) => item.range != "undefined" && item.range)
    .map((item) => [...item.range]);
};

export const TaskProps = ({ setVariants,taskProfile, setTaskProfile,setRows }) => {

  
  return (
    <>
      {taskProfile.props.map(
        item =>
          {
            // console.log(item)
            return item.type == "generator" && 
            <RangeManager
              item={item}
              taskProfile={taskProfile}
              setTaskProfile={setTaskProfile}
            />}
          )
    }
      <button
        // onClick={() => {combineArrays([[1,2,3],[4,5,6],[4,5,6]])}}
        onClick={() => {
          setRows(combineArrays(collectArrays(taskProfile.props)))
          // setVariants(combineArrays(collectArrays(taskProfile.props)));
          // setVariants("combineArrays(collectArrays(taskProfile.props))");
        }}
        className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700"
      >
        Сгенерировать и проверить задачи
      </button>
    </>
  );
};
