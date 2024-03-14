import { useTaskutils } from "../../../../taskutils";
import {

  updateDocFieldsInCollectionById,
} from "../../../../../datamodel";

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

export const useGenerator = (
  taskProfile,
  taskFunction,
  TaskId,
  collection,
  setRefreshVariants
) => {
  const utils = useTaskutils();

  const collectArrays = (props) => {
    // return [[1,2,3],[4,5,6],[4,5,6]]
    const zu = Object.keys(props)
      .filter((item) => props[item].range != "undefined" && props[item].range)
      .sort()
      .map((item) => [...props[item].range]);
    return zu;
  };

  const extractPropNames = (props) => {
    return Object.keys(props);
  };

  const fulfillWithAnswers = (pop, props, propNames, utils, taskFunction) => {
    return pop.map((item) => {
      return {
        ...item,
        answer: taskFunction.call(
          null,
          makeInput(item, props, propNames, utils)
        ),
      };
    });
  };

  const makeInput = (row, props, propNames, utils) => {
    let a = {};
    propNames.forEach((item) => (a[props[item].name] = row[item]));
    a = { ...a, utils: utils };
    return a;
  };

  const produceVariants = () => {
    let pop = combineArrays(collectArrays(taskProfile.props));
    pop = fulfillWithAnswers(
      pop,
      taskProfile.props,
      extractPropNames(taskProfile.props),
      utils,
      taskFunction
    );
    updateDocFieldsInCollectionById(collection, TaskId, { variants: pop }).then(
      () => setRefreshVariants((state) => !state)
    );
  };

  return [produceVariants];
};
